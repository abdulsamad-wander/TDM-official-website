import Link from "next/link";
import Image from "next/image";
import type { Faq, Feature, Locale, ProcessStep, ResultStat, Testimonial } from "@/lib/types";
import { href } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { JsonLd } from "./JsonLd";
import { Reveal } from "./motion/Reveal";
import { CountUp } from "./motion/CountUp";

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="kicker text-fern">{children}</p>;
}

/** Decorative animated blobs for dark sections. */
export function HeroBlobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="blob absolute -top-24 -end-24 h-96 w-96 rounded-full bg-fern/30 blur-3xl" />
      <div className="blob blob-slow absolute -bottom-32 start-1/4 h-80 w-80 rounded-full bg-amber/15 blur-3xl" />
      <div className="blob blob-slow absolute top-1/3 -start-20 h-64 w-64 rounded-full bg-sage/20 blur-3xl" />
    </div>
  );
}

export function PageHero({
  kicker,
  headline,
  sub,
  dark = false,
}: {
  kicker: string;
  headline: string;
  sub?: string;
  dark?: boolean;
}) {
  return (
    <section className={`relative ${dark ? "bg-forest text-white" : "bg-cream ribbon-bg"}`}>
      {dark && <HeroBlobs />}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <p className={`kicker hero-enter ${dark ? "text-sage" : "text-fern"}`}>{kicker}</p>
        <h1
          className="hero-enter mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl"
          style={{ "--enter-delay": "0.12s" } as React.CSSProperties}
        >
          {headline}
        </h1>
        {sub && (
          <p
            className={`hero-enter mt-5 max-w-2xl text-lg leading-relaxed ${dark ? "text-white/80" : "text-ink/75"}`}
            style={{ "--enter-delay": "0.24s" } as React.CSSProperties}
          >
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-3xl space-y-5 text-base leading-relaxed text-ink/85 md:text-lg">
      {paragraphs.map((p, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <p>{p}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => (
        <Reveal key={f.title} delay={(i % 3) * 0.08}>
          <div className="card-lift h-full rounded-2xl border border-mint bg-white p-6 hover:border-fern hover:shadow-lg">
            <span className="font-display text-sm font-bold text-sage">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-display text-lg font-semibold text-forest">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">{f.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function ProcessList({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="relative space-y-8 before:absolute before:start-5 before:top-4 before:bottom-4 before:w-px before:bg-mint">
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 0.1}>
          <li className="relative flex gap-5">
            <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest font-display text-sm font-bold text-white ring-4 ring-cream">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-forest">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/75">{s.desc}</p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

export function StatBand({ stats, dark = true }: { stats: ResultStat[]; dark?: boolean }) {
  return (
    <div className={`grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4 ${dark ? "bg-white/10" : "bg-mint"}`}>
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.1} className="h-full">
          <div className={`h-full p-6 ${dark ? "bg-forest text-white" : "bg-white"}`}>
            <p className={`font-display text-3xl font-bold md:text-4xl ${dark ? "text-amber" : "text-fern"}`}>
              <CountUp value={s.value} />
            </p>
            <p className={`mt-1 text-sm ${dark ? "text-white/75" : "text-ink/70"}`}>{s.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function FaqSection({
  faqs,
  title,
  locale = "en",
}: {
  faqs: Faq[];
  title?: string;
  locale?: Locale;
}) {
  if (faqs.length === 0) return null;
  const t = ui[locale];
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <Reveal>
        <Kicker>{t.faqKicker}</Kicker>
        <h2 className="mt-3 text-3xl font-bold text-forest">{title ?? t.faqTitle}</h2>
      </Reveal>
      <div className="mt-8 max-w-3xl divide-y divide-mint">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-ink transition-colors hover:text-forest">
                {f.q}
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint text-fern transition-transform duration-300 group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="faq-answer mt-3 text-sm leading-relaxed text-ink/75">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="card-lift flex h-full flex-col justify-between rounded-2xl border border-mint bg-white p-6 hover:border-fern hover:shadow-lg">
      <div>
        <span aria-hidden className="font-display text-4xl leading-none text-sage">
          &ldquo;
        </span>
        <blockquote className="mt-1 text-sm leading-relaxed text-ink/85">{t.quote}</blockquote>
      </div>
      <figcaption className="mt-4 text-sm font-semibold text-forest">
        {t.author}
        {t.source && <span className="font-normal text-ink/60"> · {t.source}</span>}
      </figcaption>
    </figure>
  );
}

export function CtaBand({
  headline,
  sub,
  locale = "en",
}: {
  headline?: string;
  sub?: string;
  locale?: Locale;
}) {
  const t = ui[locale];
  return (
    <section className="relative overflow-hidden bg-forest">
      <HeroBlobs />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
        <Reveal>
          <p className="kicker text-sage">{t.letsTalk}</p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">{headline ?? t.ctaHeadline}</h2>
          <p className="mt-3 max-w-xl text-white/80">{sub ?? t.ctaSub}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <Link
            href={href(locale, "/contact/")}
            className="inline-block shrink-0 rounded-full bg-amber px-7 py-3.5 font-semibold text-white shadow-lg shadow-amber/25 transition duration-300 hover:scale-105 hover:brightness-110"
          >
            {t.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function LogoWall({
  logos,
  title,
  locale = "en",
  marquee = false,
}: {
  logos: { name: string; file: string }[];
  title?: string;
  locale?: Locale;
  marquee?: boolean;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      {title && (
        <Reveal>
          <Kicker>{ui[locale].ourClients}</Kicker>
          <h2 className="mt-3 text-3xl font-bold text-forest">{title}</h2>
        </Reveal>
      )}
      {marquee ? (
        <div className="marquee mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track flex w-max items-center gap-4">
            {[...logos, ...logos].map((l, i) => (
              <div
                key={`${l.file}-${i}`}
                className="flex h-20 w-36 shrink-0 items-center justify-center rounded-xl border border-mint bg-white p-4"
                title={l.name}
              >
                <Image
                  src={`/clients/${l.file}`}
                  alt={`${l.name} logo`}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain opacity-80"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {logos.map((l, i) => (
            <Reveal key={l.file} delay={(i % 6) * 0.05}>
              <div
                className="card-lift flex items-center justify-center rounded-xl border border-mint bg-white p-4 hover:border-fern"
                title={l.name}
              >
                <Image
                  src={`/clients/${l.file}`}
                  alt={`${l.name} logo`}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
                />
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.label,
            item: `https://thedigitalmarketing.services${it.href}`,
          })),
        }}
      />
      <ol className="flex flex-wrap gap-1 text-xs text-ink/60">
        {items.map((it, i) => (
          <li key={it.href} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden>/</span>}
            {i < items.length - 1 ? (
              <Link href={it.href} className="transition-colors hover:text-forest">{it.label}</Link>
            ) : (
              <span aria-current="page" className="text-ink/80">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
