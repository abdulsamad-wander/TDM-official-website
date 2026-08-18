import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { href } from "@/lib/i18n";
import { getContent } from "@/content";
import { ui } from "@/content/ui";
import {
  Breadcrumbs,
  CtaBand,
  Kicker,
  PageHero,
  Prose,
  StatBand,
  TestimonialCard,
} from "@/components/Sections";
import { Reveal } from "@/components/motion/Reveal";

const displayName = (cs: { anonymous: boolean; publicName: string; client: string }) =>
  cs.anonymous ? cs.publicName : cs.client;

export function CaseStudiesIndexView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = ui[locale];
  const p = c.pages.caseStudiesPage;

  return (
    <>
      <PageHero kicker={p.hero.kicker} headline={p.hero.headline} sub={p.hero.sub} dark />
      <Breadcrumbs
        items={[
          { label: t.home, href: href(locale, "/") },
          { label: t.caseStudiesLabel, href: href(locale, "/case-studies/") },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {c.caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={(i % 2) * 0.1}>
              <Link
                href={href(locale, `/case-studies/${cs.slug}/`)}
                className="group card-lift flex h-full flex-col rounded-2xl border border-mint bg-white p-7 hover:border-fern hover:shadow-xl"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-ink/50">
                  {cs.industry}
                  {cs.country ? ` · ${cs.country}` : ""}
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold text-forest">{displayName(cs)}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/75">{cs.summary}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {cs.results.slice(0, 3).map((r) => (
                    <span key={r.label} className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-forest">
                      {r.value} {r.label.split("(")[0].trim()}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand locale={locale} headline={p.ctaHeadline} />
    </>
  );
}

export function CaseStudyView({ locale, slug }: { locale: Locale; slug: string }) {
  const c = getContent(locale);
  const t = ui[locale];
  const cs = c.caseStudies.find((x) => x.slug === slug);
  if (!cs) notFound();
  const copy = c.pages.caseStudyPage;

  return (
    <>
      <PageHero
        kicker={`${copy.kickerPrefix} · ${cs.industry}`}
        headline={displayName(cs)}
        sub={cs.summary}
        dark
      />
      <Breadcrumbs
        items={[
          { label: t.home, href: href(locale, "/") },
          { label: t.caseStudiesLabel, href: href(locale, "/case-studies/") },
          { label: displayName(cs), href: href(locale, `/case-studies/${cs.slug}/`) },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {cs.services.map((s) => (
            <span key={s} className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-forest">
              {s}
            </span>
          ))}
          {cs.timeline && (
            <span className="rounded-full border border-mint px-3 py-1 text-xs font-semibold text-ink/70">
              {cs.timeline}
            </span>
          )}
        </div>

        <div className="mt-10">
          <StatBand stats={cs.results} />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <Kicker>{copy.challengeLabel}</Kicker>
            <div className="mt-4">
              <Prose paragraphs={[cs.challenge]} />
            </div>
          </div>
          <div>
            <Kicker>{copy.approachLabel}</Kicker>
            <ul className="mt-4 space-y-3">
              {cs.approach.map((a) => (
                <li key={a} className="flex gap-3 text-base leading-relaxed text-ink/85">
                  <span className="mt-1 text-fern" aria-hidden>✓</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {cs.testimonial && (
          <Reveal>
            <div className="mt-12 max-w-xl">
              <TestimonialCard t={{ quote: cs.testimonial.quote, author: cs.testimonial.author }} />
            </div>
          </Reveal>
        )}
      </section>

      <CtaBand locale={locale} headline={copy.ctaHeadline} />
    </>
  );
}
