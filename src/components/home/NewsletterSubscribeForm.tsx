"use client";

import { useEffect, useRef, useState } from "react";
import { TURNSTILE_SITE_KEY } from "@/lib/turnstile";

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileScript: Promise<void> | null = null;

/** Inject the Turnstile script once per page, however many forms mount. */
function loadTurnstile(): Promise<void> {
  turnstileScript ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      turnstileScript = null;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return turnstileScript;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";
type Tone = "light" | "dark";

export type NewsletterFormLabels = {
  namePlaceholder: string;
  emailPlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorFallback: string;
  nameSrLabel: string;
  emailSrLabel: string;
};

interface NewsletterSubscribeFormProps {
  sourcepage?: string;
  inputId?: string;
  /** Light: home newsletter section. Dark: footer column. */
  tone?: Tone;
  labels: NewsletterFormLabels;
}

const toneStyles: Record<
  Tone,
  {
    form: string;
    row: string;
    input: string;
    button: string;
    successText: string;
    errorText: string;
  }
> = {
  light: {
    form: "flex w-full flex-col items-center gap-[12px]",
    row: "flex w-full flex-col items-center gap-[12px] sm:w-auto sm:flex-row",
    input:
      "h-[42px] w-full rounded-[10px] border border-[rgba(35,110,91,0.26)] bg-white px-[18px] text-[14px] text-[var(--color-txt)] outline-none transition-colors duration-200 placeholder:text-[var(--color-txt-dim)] focus:border-[var(--color-brand)] sm:h-[51px] sm:w-[360px] sm:text-[15px]",
    button:
      "btn btn-primary h-[51px] w-full py-0 disabled:cursor-not-allowed disabled:opacity-60 sm:h-auto sm:w-auto sm:py-[16px]",
    successText: "text-[var(--color-grad-end)]",
    errorText: "text-red-600",
  },
  dark: {
    form: "flex w-full flex-col gap-[16px]",
    row: "flex flex-col gap-[24px]",
    input:
      "w-full rounded-[10px] border border-[rgba(232,238,235,0.12)] bg-[rgba(232,238,235,0.04)] p-[12px] text-[13px] text-white outline-none transition-colors duration-200 placeholder:text-[rgba(203,217,211,0.5)] focus:border-[rgba(166,201,186,0.5)]",
    button:
      "self-start rounded-[8px] bg-[var(--color-grad-start)] px-[20px] py-[10px] text-[13px] font-medium text-white transition-colors duration-200 hover:bg-[var(--color-brand-2)] disabled:cursor-not-allowed disabled:opacity-60",
    successText: "text-[var(--color-brand-soft)]",
    errorText: "text-red-400",
  },
};

export default function NewsletterSubscribeForm({
  sourcepage = "homepage",
  inputId = "newsletter-email",
  tone = "light",
  labels,
}: NewsletterSubscribeFormProps) {
  const styles = toneStyles[tone];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const turnstileToken = useRef("");
  // The interaction-only widget is invisible; it only takes space if a challenge is shown.
  const [challengeVisible, setChallengeVisible] = useState(false);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !widgetRef.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(widgetRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          appearance: "interaction-only",
          callback: (token: string) => {
            turnstileToken.current = token;
          },
          "expired-callback": () => {
            turnstileToken.current = "";
          },
          "error-callback": () => {
            turnstileToken.current = "";
          },
          "before-interactive-callback": () => setChallengeVisible(true),
          "after-interactive-callback": () => setChallengeVisible(false),
        });
      })
      .catch(() => {
        // Script blocked or offline: submit shows the generic error.
      });
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setMessage("");

    try {
      if (!turnstileToken.current) throw new Error(labels.errorFallback);

      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          sourcepage,
          turnstileToken: turnstileToken.current,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error ?? "Failed to subscribe to newsletter");
      }

      setStatus("success");
      setMessage(labels.successMessage);
      setName("");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : labels.errorFallback
      );
    }

    // Tokens are single-use: get a fresh one for the next attempt.
    turnstileToken.current = "";
    if (widgetId.current) window.turnstile?.reset(widgetId.current);

    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <label className="sr-only" htmlFor={`${inputId}-name`}>
          {labels.nameSrLabel}
        </label>
        <input
          id={`${inputId}-name`}
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={labels.namePlaceholder}
          className={styles.input}
        />
        <label className="sr-only" htmlFor={inputId}>
          {labels.emailSrLabel}
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={labels.emailPlaceholder}
          className={styles.input}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={styles.button}
        >
          {status === "submitting" ? labels.submittingLabel : labels.submitLabel}
        </button>
      </div>
      {/* Absolutely positioned while invisible so it adds no flex gap. */}
      <div ref={widgetRef} className={challengeVisible ? "" : "absolute"} />
      <p
        aria-live="polite"
        className={`w-full text-start text-[13px] leading-[normal] ${
          status === "success"
            ? styles.successText
            : status === "error"
              ? styles.errorText
              : "hidden"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
