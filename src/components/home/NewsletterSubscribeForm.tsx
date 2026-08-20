"use client";

import { useEffect, useRef, useState } from "react";

type SubmitStatus = "idle" | "submitting" | "success" | "error";
type Tone = "light" | "dark";

interface NewsletterSubscribeFormProps {
  sourcepage?: string;
  inputId?: string;
  /** Light: home newsletter section. Dark: footer column. */
  tone?: Tone;
}

const toneStyles: Record<
  Tone,
  {
    form: string;
    row: string;
    input: string;
    button: string;
    placeholder: string;
    submitLabel: string;
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
    placeholder: "ادخل بريدك الإلكتروني….",
    submitLabel: "اشترك في نشرة إتقان",
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
    placeholder: "بريدك الإلكتروني",
    submitLabel: "اشترك الآن",
    successText: "text-[var(--color-brand-soft)]",
    errorText: "text-red-400",
  },
};

export default function NewsletterSubscribeForm({
  sourcepage = "homepage",
  inputId = "newsletter-email",
  tone = "light",
}: NewsletterSubscribeFormProps) {
  const styles = toneStyles[tone];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, sourcepage }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error ?? "Failed to subscribe to newsletter");
      }

      setStatus("success");
      setMessage("تم الاشتراك بنجاح — ستصلك النشرة القادمة في بريدك.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى."
      );
    }

    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <label className="sr-only" htmlFor={inputId}>
          بريدك الإلكتروني
        </label>
        <input
          id={inputId}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={styles.placeholder}
          className={styles.input}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={styles.button}
        >
          {status === "submitting" ? "جارٍ الاشتراك…" : styles.submitLabel}
        </button>
      </div>
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
