import Image from "next/image";

/**
 * Card / Topic (7:6) — "240px discussion card: category pill, 3-line clamped
 * title, footer with overlapping avatars and reply count. RTL, min-height 118,
 * hugs its text."
 */
export type Topic = {
  category: string;
  title: string;
  replies: string;
};

/** Avatar (6:7) — 21px gradient disc, 1.5px white ring, 10px white initial. */
function Avatar({ initial }: { initial: string }) {
  return (
    <span className="flex size-[21px] items-center justify-center rounded-[10.5px] border-[1.5px] border-white bg-gradient-to-b from-[#2e8069] to-[#1b5749] text-[10px] text-white">
      {initial}
    </span>
  );
}

/** Icon / Reply (6:11) — 12.5px chat-bubble outline. */
function IconReply() {
  return (
    <Image
      src="/figma/icon-reply.svg"
      alt=""
      width={13}
      height={13}
      className="size-[12.5px]"
    />
  );
}

export function TopicCard({
  topic,
  className = "min-h-[118px] w-[240px]",
  titleLines,
  dropShadow = true,
  avatarInitials = ["م", "ن", "ح"],
}: {
  topic: Topic;
  className?: string;
  /** Clamps the title so fixed-pitch marquees can rely on the card height. */
  titleLines?: 2 | 3;
  /** Figma's lifted-card shadow; off on the mobile marquee's tight stack. */
  dropShadow?: boolean;
  /** The three overlapping avatar initials, locale-dependent. */
  avatarInitials?: string[];
}) {
  const clamp =
    titleLines === 2 ? "line-clamp-2" : titleLines === 3 ? "line-clamp-3" : "";
  const shadow = dropShadow
    ? " drop-shadow-[0_20px_22px_rgba(16,54,45,0.3)]"
    : "";
  return (
    <article
      className={`flex flex-col justify-between rounded-[var(--radius-topic)] border border-[rgba(18,70,58,0.1)] bg-white px-[16px] pt-[15px] pb-[13px]${shadow} ${className}`}
    >
      <div className="flex w-full flex-col items-start gap-[9px]">
        <span className="rounded-[var(--radius-pill)] bg-[var(--brand-a10)] px-[10px] py-[4px] text-[11px] text-[var(--color-grad-end)]">
          {topic.category}
        </span>
        {/* !leading-[normal]: the marquee track has a fixed 131.4px pitch. */}
        <h3
          className={`w-full text-start text-[15px] font-medium !leading-[normal] text-[var(--color-topic-title)] ${clamp}`}
        >
          {topic.title}
        </h3>
      </div>

      {/* Under RTL the first child renders right: avatars right, replies left. */}
      <div className="mt-[11px] flex w-full items-center justify-between border-t border-[rgba(18,70,58,0.08)] pt-[11px]">
        <div className="flex items-center">
          <Avatar initial={avatarInitials[0]} />
          <span className="-me-[6px]" />
          <Avatar initial={avatarInitials[1]} />
          <span className="-me-[6px]" />
          <Avatar initial={avatarInitials[2]} />
        </div>
        <div className="flex items-center gap-[4px]">
          <IconReply />
          <span className="text-[11px] text-[var(--color-txt-dim)]">{topic.replies}</span>
        </div>
      </div>
    </article>
  );
}

/**
 * Card / Photo (7:5) — "240×172.8 community photo, 14px radius, 14% brand
 * hairline, lifted shadow. Recycled through the vertical carousel."
 */
export function ShotCard({
  src,
  alt,
  className = "h-[172.8px] w-[240px]",
  dropShadow = true,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  /** Figma's lifted-photo shadow; off on the mobile marquee's tight stack. */
  dropShadow?: boolean;
  /** Eager-load photos that live far down an animated track. */
  eager?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-shot)] border border-[rgba(35,110,91,0.14)] bg-[var(--color-bg-2)]${dropShadow ? " shadow-[0_20px_44px_-18px_rgba(16,54,45,0.34)]" : ""} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="240px"
        loading={eager ? "eager" : undefined}
        className="object-cover"
      />
    </div>
  );
}

/** Mote (8:15) — 3px brand particle with an 8px glow. */
export function Mote({
  left,
  top,
  delay,
}: {
  left: number;
  top: number;
  delay: number;
}) {
  return (
    <span
      aria-hidden
      className="absolute size-[3px] rounded-full bg-[var(--color-brand-2)] shadow-[0_0_8px_2px_rgba(55,130,110,0.6)]"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        animation: `itqan-mote 9s linear ${delay}s infinite`,
      }}
    />
  );
}
