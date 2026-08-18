"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/types";
import { href } from "@/lib/i18n";
import { ui } from "@/content/ui";

interface NavChild {
  label: string;
  path: string;
}
interface NavItem {
  label: string;
  path: string;
  children?: NavChild[];
}

const navByLocale: Record<Locale, NavItem[]> = {
  en: [
    {
      label: "Media",
      path: "/media/",
      children: [
        { label: "Video Editing", path: "/media/video-editing/" },
        { label: "Video Shoots", path: "/media/video-shoots/" },
        { label: "UGC Ads", path: "/media/ugc-ads/" },
        { label: "Product Shoots", path: "/media/product-shoots/" },
        { label: "Ad Creatives", path: "/media/ad-creatives/" },
      ],
    },
    {
      label: "Marketing",
      path: "/marketing/",
      children: [
        { label: "Performance Marketing", path: "/marketing/performance-marketing/" },
        { label: "SEO", path: "/marketing/seo/" },
        { label: "Social Media", path: "/marketing/social-media/" },
      ],
    },
    {
      label: "Development",
      path: "/development/",
      children: [
        { label: "Shopify", path: "/development/shopify/" },
        { label: "WordPress", path: "/development/wordpress/" },
        { label: "Magento", path: "/development/magento/" },
        { label: "Custom Development", path: "/development/custom-development/" },
        { label: "CRM & ERP", path: "/development/crm-erp/" },
        { label: "Mobile Apps", path: "/development/mobile-apps/" },
      ],
    },
    { label: "Staff Augmentation", path: "/staff-augmentation/" },
    { label: "Portfolio", path: "/portfolio/" },
    { label: "About", path: "/about/" },
    { label: "Blog", path: "/blog/" },
  ],
  fr: [
    {
      label: "Média",
      path: "/media/",
      children: [
        { label: "Montage vidéo", path: "/media/video-editing/" },
        { label: "Tournages vidéo", path: "/media/video-shoots/" },
        { label: "Publicités UGC", path: "/media/ugc-ads/" },
        { label: "Shooting produits", path: "/media/product-shoots/" },
        { label: "Créations publicitaires", path: "/media/ad-creatives/" },
      ],
    },
    {
      label: "Marketing",
      path: "/marketing/",
      children: [
        { label: "Marketing à la performance", path: "/marketing/performance-marketing/" },
        { label: "SEO", path: "/marketing/seo/" },
        { label: "Réseaux sociaux", path: "/marketing/social-media/" },
      ],
    },
    {
      label: "Développement",
      path: "/development/",
      children: [
        { label: "Shopify", path: "/development/shopify/" },
        { label: "WordPress", path: "/development/wordpress/" },
        { label: "Magento", path: "/development/magento/" },
        { label: "Développement sur mesure", path: "/development/custom-development/" },
        { label: "CRM & ERP", path: "/development/crm-erp/" },
        { label: "Applications mobiles", path: "/development/mobile-apps/" },
      ],
    },
    { label: "Renfort d'équipes", path: "/staff-augmentation/" },
    { label: "Portfolio", path: "/portfolio/" },
    { label: "À propos", path: "/about/" },
  ],
  ar: [
    {
      label: "الميديا",
      path: "/media/",
      children: [
        { label: "مونتاج الفيديو", path: "/media/video-editing/" },
        { label: "تصوير الفيديو", path: "/media/video-shoots/" },
        { label: "إعلانات UGC", path: "/media/ugc-ads/" },
        { label: "تصوير المنتجات", path: "/media/product-shoots/" },
        { label: "التصاميم الإعلانية", path: "/media/ad-creatives/" },
      ],
    },
    {
      label: "التسويق",
      path: "/marketing/",
      children: [
        { label: "التسويق بالأداء", path: "/marketing/performance-marketing/" },
        { label: "تحسين محركات البحث", path: "/marketing/seo/" },
        { label: "السوشيال ميديا", path: "/marketing/social-media/" },
      ],
    },
    {
      label: "التطوير",
      path: "/development/",
      children: [
        { label: "شوبيفاي", path: "/development/shopify/" },
        { label: "ووردبريس", path: "/development/wordpress/" },
        { label: "ماجنتو", path: "/development/magento/" },
        { label: "تطوير مخصص", path: "/development/custom-development/" },
        { label: "أنظمة CRM و ERP", path: "/development/crm-erp/" },
        { label: "تطبيقات الجوال", path: "/development/mobile-apps/" },
      ],
    },
    { label: "تعزيز فرق العمل", path: "/staff-augmentation/" },
    { label: "أعمالنا", path: "/portfolio/" },
    { label: "من نحن", path: "/about/" },
  ],
};

const languageSwitch: { locale: Locale; label: string }[] = [
  { locale: "en", label: "EN" },
  { locale: "fr", label: "FR" },
  { locale: "ar", label: "AR" },
];

export function Header({ locale = "en" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = navByLocale[locale];
  const t = ui[locale];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "border-b border-mint"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href={href(locale, "/")} className="flex shrink-0 items-center" aria-label="TDM — The Digital Marketing Services">
          <Image src="/logo.png" alt="TDM — The Digital Marketing Services" width={140} height={34} priority />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <div key={item.path} className="group relative">
              <Link
                href={href(locale, item.path)}
                className="flex items-center gap-1 py-6 text-[15px] font-medium text-ink transition-colors hover:text-fern"
              >
                {item.label}
                {item.children && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 text-ink/50 transition-transform duration-200 group-hover:rotate-180 group-hover:text-fern"
                    aria-hidden
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </Link>
              {item.children && (
                <div className="invisible absolute start-0 top-full min-w-56 pt-1 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="rounded-lg border border-mint bg-white py-2 shadow-lg">
                    {item.children.map((c) => (
                      <Link
                        key={c.path}
                        href={href(locale, c.path)}
                        className="block px-4 py-2 text-sm text-ink/85 transition-colors hover:bg-cream hover:text-forest"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex items-center gap-2 text-xs font-semibold text-ink/50">
            {languageSwitch.map((l, i) => (
              <span key={l.locale} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>·</span>}
                <Link
                  href={l.locale === "en" ? "/" : `/${l.locale}/`}
                  className={l.locale === locale ? "text-forest" : "transition-colors hover:text-forest"}
                >
                  {l.label}
                </Link>
              </span>
            ))}
          </div>
          <Link
            href={href(locale, "/contact/")}
            className="rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pine"
          >
            {t.cta}
          </Link>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          className="relative h-10 w-10 rounded-md p-2 text-forest lg:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span className={`absolute start-2 end-2 top-3 h-0.5 rounded-full bg-forest transition-all duration-300 ${open ? "top-[19px] rotate-45" : ""}`} />
          <span className={`absolute start-2 end-2 top-[19px] h-0.5 rounded-full bg-forest transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`absolute start-2 end-2 top-[26px] h-0.5 rounded-full bg-forest transition-all duration-300 ${open ? "top-[19px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`grid overflow-hidden transition-all duration-400 ease-in-out lg:hidden ${
          open ? "grid-rows-[1fr] border-t border-mint" : "grid-rows-[0fr]"
        }`}
      >
        <nav className="min-h-0 overflow-hidden bg-white px-4" aria-label="Mobile">
          <div className="pb-6 pt-2">
            {nav.map((item) => (
              <div key={item.path}>
                <Link href={href(locale, item.path)} className="block py-2.5 font-medium text-ink" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mb-1 ms-4 border-s border-mint ps-3">
                    {item.children.map((c) => (
                      <Link
                        key={c.path}
                        href={href(locale, c.path)}
                        className="block py-1.5 text-sm text-ink/75"
                        onClick={() => setOpen(false)}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex items-center gap-3 text-sm font-semibold text-ink/60">
              {languageSwitch.map((l) => (
                <Link
                  key={l.locale}
                  href={l.locale === "en" ? "/" : `/${l.locale}/`}
                  className={l.locale === locale ? "text-forest underline underline-offset-4" : ""}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Link
              href={href(locale, "/contact/")}
              className="mt-4 block rounded-full bg-forest px-5 py-3 text-center font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {t.cta}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
