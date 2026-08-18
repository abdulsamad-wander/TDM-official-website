import Link from "next/link";
import type { Locale } from "@/lib/types";
import { href } from "@/lib/i18n";
import { site } from "@/lib/site";
import { getContent } from "@/content";
import { ui } from "@/content/ui";
import {
  CtaBand,
  FaqSection,
  HeroBlobs,
  Kicker,
  LogoWall,
  StatBand,
  TestimonialCard,
} from "@/components/Sections";
import { Reveal } from "@/components/motion/Reveal";

const displayName = (cs: { anonymous: boolean; publicName: string; client: string }) =>
  cs.anonymous ? cs.publicName : cs.client;

export function HomeView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = ui[locale];
  const p = c.pages.home;
  const featured = c.caseStudies.slice(0, 3);

  const heroStats = [
    { value: site.stats.satisfaction, label: p.statLabels.satisfaction },
    { value: site.stats.clients, label: p.statLabels.clients },
    { value: site.stats.specialists, label: p.statLabels.specialists },
    { value: site.stats.bestRoas, label: p.statLabels.roas },
  ];

  // Highlight the last word of the headline with the animated gradient
  const words = p.heroHeadline.split(" ");
  const lead = words.slice(0, -1).join(" ");
  const last = words[words.length - 1];

  return (
    <>
      <section className="relative overflow-hidden bg-forest text-white">
        <HeroBlobs />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 md:pt-28">
          <p className="kicker hero-enter text-sage">{p.heroKicker}</p>
          <h1
            className="hero-enter mt-5 max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl"
            style={{ "--enter-delay": "0.12s" } as React.CSSProperties}
          >
            {lead} <span className="gradient-text">{last}</span>
          </h1>
          <p
            className="hero-enter mt-6 max-w-2xl text-lg leading-relaxed text-white/80"
            style={{ "--enter-delay": "0.24s" } as React.CSSProperties}
          >
            {p.heroSub}
          </p>
          <div
            className="hero-enter mt-8 flex flex-wrap gap-4"
            style={{ "--enter-delay": "0.36s" } as React.CSSProperties}
          >
            <Link
              href={href(locale, "/contact/")}
              className="rounded-full bg-amber px-7 py-3.5 font-semibold text-white shadow-lg shadow-amber/25 transition duration-300 hover:scale-105 hover:brightness-110"
            >
              {t.cta}
            </Link>
            <Link
              href={href(locale, "/case-studies/")}
              className="rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white transition duration-300 hover:border-white/60 hover:bg-white/10"
            >
              {t.seeResults}
            </Link>
          </div>
          <div
            className="hero-enter mt-14"
            style={{ "--enter-delay": "0.5s" } as React.CSSProperties}
          >
            <StatBand stats={heroStats} />
          </div>
        </div>
      </section>

      <section className="ribbon-bg mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <Kicker>{p.sectorsKicker}</Kicker>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold text-forest md:text-4xl">{p.sectorsTitle}</h2>
          <p className="mt-4 max-w-2xl text-ink/75">{p.sectorsSub}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {c.sectors.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.12}>
              <Link
                href={href(locale, `/${s.slug}/`)}
                className="group card-lift block h-full rounded-2xl border border-mint bg-white p-8 hover:border-fern hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold text-forest">{s.name}</h3>
                  <span className="font-display text-3xl font-bold text-mint transition-colors group-hover:text-sage">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-fern">{s.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink/75">{s.intro[0]}</p>
                <p className="mt-5 text-sm font-semibold text-forest">
                  {t.explore} {s.name} <span className="arrow-nudge">→</span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Scrolling services ticker */}
      <div className="marquee overflow-hidden border-y border-mint bg-white py-4">
        <div className="marquee-track flex w-max items-center gap-8" style={{ animationDuration: "30s" }}>
          {[...c.services, ...c.services].map((sv, i) => (
            <span key={`${sv.slug}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-display text-sm font-bold uppercase tracking-wider text-forest/70">
                {sv.name}
              </span>
              <span className="text-amber" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      <section className="bg-mint/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal>
            <Kicker>{p.caseKicker}</Kicker>
            <h2 className="mt-3 text-3xl font-bold text-forest md:text-4xl">{p.caseTitle}</h2>
            <p className="mt-4 max-w-2xl text-ink/75">{p.caseSub}</p>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featured.map((cs, i) => (
              <Reveal key={cs.slug} delay={(i % 3) * 0.1}>
                <Link
                  href={href(locale, `/case-studies/${cs.slug}/`)}
                  className="group card-lift flex h-full flex-col rounded-2xl border border-mint bg-white p-6 hover:border-fern hover:shadow-xl"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-ink/50">{cs.industry}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-forest">{displayName(cs)}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/75">{cs.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {cs.results.slice(0, 2).map((r) => (
                      <span key={r.label} className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-forest">
                        {r.value} {r.label.split("(")[0].trim()}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <Link
              href={href(locale, "/case-studies/")}
              className="group mt-8 inline-block font-semibold text-forest hover:underline"
            >
              {t.allCaseStudies}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <Kicker>{p.whyKicker}</Kicker>
          <h2 className="mt-3 text-3xl font-bold text-forest md:text-4xl">{p.whyTitle}</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {p.whyItems.map(([title, desc], i) => (
            <Reveal key={title} delay={(i % 3) * 0.08}>
              <div className="card-lift h-full rounded-2xl border border-mint bg-white p-6 hover:border-fern hover:shadow-lg">
                <h3 className="font-display text-lg font-semibold text-forest">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How we deliver — process band */}
      <section className="relative overflow-hidden bg-forest text-white">
        <HeroBlobs />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <Reveal>
            <p className="kicker text-sage">{t.homeProcess.kicker}</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">{t.homeProcess.title}</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {t.homeProcess.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.12}>
                <div className="group relative">
                  {i < t.homeProcess.steps.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute start-14 top-6 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-sage/60 to-transparent md:block"
                    />
                  )}
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-sage/40 bg-white/5 font-display text-lg font-bold text-amber transition-all duration-300 group-hover:scale-110 group-hover:bg-amber group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LogoWall logos={c.clientLogos} title={p.logosTitle} locale={locale} marquee />

      <section className="bg-mint/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal>
            <Kicker>{t.clientFeedback}</Kicker>
            <h2 className="mt-3 text-3xl font-bold text-forest">{t.whatOurClientsSay}</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {c.testimonials.slice(0, 3).map((tm, i) => (
              <Reveal key={tm.quote} delay={(i % 3) * 0.1}>
                <TestimonialCard t={tm} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={p.faqs} locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}
