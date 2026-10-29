"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { siteContent, type Faq } from "@/content/site";
import { siteSettings } from "@/lib/site-settings";
import { buildEmailDraft, isAcceptedResponse, validateInquiry, type Inquiry } from "@/lib/contact";

type Theme = "light" | "dark";
const { business } = siteContent;

export function Arrow({ className = "", direction = "right" }: { className?: string; direction?: string }) {
  return <svg className={`arrow-icon ${className}`} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={direction === "up" ? { transform: "rotate(-45deg)" } : undefined}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function PhoneIcon({ className = "" }: { className?: string }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.2 3.5h3.1l1.6 4.3-2.1 1.4a11.5 11.5 0 0 0 7 7l1.4-2.1 4.3 1.6v3.1a2 2 0 0 1-2.2 2A17.3 17.3 0 0 1 3.2 5.7a2 2 0 0 1 2-2.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>;
}

export function PinIcon({ className = "" }: { className?: string }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21.5s-7-6.2-7-11.7a7 7 0 0 1 14 0c0 5.5-7 11.7-7 11.7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="12" cy="9.8" r="2.6" stroke="currentColor" strokeWidth="1.6" /></svg>;
}

/** The client's own logo files, taken from kandrhvac.com. */
export function Logo({ inverse = false, className = "" }: { inverse?: boolean; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={`kr-logo ${className}`} src={inverse ? "/brand/kr-logo-white.png" : "/brand/kr-logo.png"} alt={business.name} width={186} height={109} />;
}

export function SiteHeader({ theme, serviceLinks }: { theme: Theme; serviceLinks: Record<string, string> }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => {
    if (!servicesOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { setServicesOpen(false); servicesRef.current?.querySelector("button")?.focus(); }
    }
    function onPointer(event: PointerEvent) {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); };
  }, [servicesOpen]);
  return <header className={`site-header theme-${theme}`}>
    <div className="header-inner">
      <a className="brand-link" href="#top" aria-label={`${business.name} home`}><Logo inverse={theme === "dark"} /></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {siteContent.nav.map(item => item.label === "Services"
          ? <div key={item.href} className="nav-dropdown" ref={servicesRef} onMouseLeave={() => setServicesOpen(false)}>
              <button type="button" aria-expanded={servicesOpen} aria-controls={`services-menu-${theme}`} onClick={() => setServicesOpen(!servicesOpen)} onMouseEnter={() => setServicesOpen(true)}>Services <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="m2 3.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" /></svg></button>
              <div id={`services-menu-${theme}`} className="nav-menu" hidden={!servicesOpen}>{siteContent.services.map(service => <a key={service.id} href={serviceLinks[service.id] ?? "#services"} onClick={() => setServicesOpen(false)}>{service.title}</a>)}</div>
            </div>
          : <a key={item.href} href={item.href} aria-current={item.label === "Home" ? "page" : undefined}>{item.label}</a>)}
      </nav>
      <div className="header-actions">
        <a className="header-phone" href={business.phoneHref}><PhoneIcon /><span><strong>{business.phone}</strong>{theme === "light" && <small>{business.location}</small>}</span></a>
        <a className="header-cta" href="#contact">Book Your Service</a>
      </div>
      <button ref={trigger} type="button" className="mobile-toggle" aria-expanded={open} aria-controls={`mobile-navigation-${theme}`} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}><span aria-hidden="true" className={`burger ${open ? "is-open" : ""}`}><i /><i /><i /></span></button>
    </div>
    {open && <div id={`mobile-navigation-${theme}`} ref={panel} className="mobile-navigation"><nav aria-label="Mobile navigation">{siteContent.nav.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<Arrow /></a>)}<a className="mobile-phone" href={business.phoneHref}><PhoneIcon /> Call {business.phone}</a><a className="mobile-cta" href="#contact" onClick={() => setOpen(false)}>Book Your Service<Arrow /></a></nav></div>}
  </header>;
}

/**
 * Page-level motion: intro curtain, scroll progress, header state, parallax,
 * cursor spotlights, card tilt, and [data-anim] entrances. Everything is
 * skipped for reduced-motion visitors, and content stays visible without JS.
 */
export function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("motion-ready");
    const cleanups: (() => void)[] = [];

    const entrances = document.querySelectorAll<HTMLElement>("[data-anim]");
    if ("IntersectionObserver" in window) {
      // A fully clipped element never reports an intersection, so wipes are
      // triggered by their (unclipped) parent instead.
      const targets = new Map<Element, HTMLElement[]>();
      entrances.forEach(node => {
        let watched: HTMLElement = node;
        if (node.dataset.anim?.startsWith("wipe")) {
          watched = node.parentElement ?? node;
          while (watched.parentElement && getComputedStyle(watched).display === "contents") watched = watched.parentElement;
        }
        targets.set(watched, [...(targets.get(watched) ?? []), node]);
      });
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) { targets.get(entry.target)?.forEach(node => node.classList.add("is-in")); observer.unobserve(entry.target); }
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      targets.forEach((_, watched) => observer.observe(watched));
      cleanups.push(() => observer.disconnect());
    } else entrances.forEach(node => node.classList.add("is-in"));

    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    const header = document.querySelector<HTMLElement>(".site-header");
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let lastY = window.scrollY;
    let frame = 0;
    function update() {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      if (header) {
        header.classList.toggle("is-scrolled", y > 24);
        const menuOpen = header.querySelector("[aria-expanded=true]");
        header.classList.toggle("is-hidden", !menuOpen && y > 420 && y > lastY + 2);
        if (y < lastY - 2) header.classList.remove("is-hidden");
      }
      for (const node of parallax) {
        const rect = node.parentElement!.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > window.innerHeight + 100) continue;
        // The image lags behind the scroll; CSS oversizes it by 18% so the clamp never shows an edge.
        const limit = rect.height * 0.085;
        const offset = Math.max(-limit, Math.min(limit, -(rect.top + rect.height / 2 - window.innerHeight / 2) * Number(node.dataset.parallax)));
        node.style.translate = `0 ${offset.toFixed(1)}px`;
      }
      lastY = y;
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(frame); });

    if (window.matchMedia("(hover: hover)").matches) {
      document.querySelectorAll<HTMLElement>("[data-spotlight],[data-tilt]").forEach(node => {
        const move = (event: PointerEvent) => {
          const rect = node.getBoundingClientRect();
          const x = event.clientX - rect.left, y = event.clientY - rect.top;
          node.style.setProperty("--mx", `${x}px`); node.style.setProperty("--my", `${y}px`);
          node.style.setProperty("--tx", ((x / rect.width - .5) * 2).toFixed(3)); node.style.setProperty("--ty", ((y / rect.height - .5) * 2).toFixed(3));
        };
        const leave = () => { node.style.setProperty("--tx", "0"); node.style.setProperty("--ty", "0"); };
        node.addEventListener("pointermove", move); node.addEventListener("pointerleave", leave);
        cleanups.push(() => { node.removeEventListener("pointermove", move); node.removeEventListener("pointerleave", leave); });
      });
    }
    return () => { cleanups.forEach(fn => fn()); root.classList.remove("motion-ready"); };
  }, []);
  return <><div className="page-curtain" aria-hidden="true"><i /><span /></div><div className="scroll-progress" aria-hidden="true" /></>;
}

/** Headline whose words rise into place one after another. */
export function SplitWords({ lines, start = 0 }: { lines: readonly string[]; start?: number }) {
  let index = start;
  return <span className="split-words">{lines.map((line, lineIndex) => <span key={line} className="split-line">{line.split(" ").map((word, wordIndex, words) => <Fragment key={`${word}-${wordIndex}`}><span className="w"><span style={{ "--i": index++ } as CSSProperties}>{word}</span></span>{wordIndex < words.length - 1 && " "}</Fragment>)}{lineIndex < lines.length - 1 ? <br /> : null}{lineIndex < lines.length - 1 && " "}</span>)}</span>;
}

export function Reveal({ children, className = "", delay = 0, id, effect = "up" }: { children: ReactNode; className?: string; delay?: number; id?: string; effect?: "up" | "left" | "right" | "zoom" }) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = el.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    // Content starts visible in the HTML. Only animate elements below the first fold.
    if (node.getBoundingClientRect().top < window.innerHeight) return;
    node.dataset.reveal = "waiting";
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { node.dataset.reveal = "visible"; observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={el} id={id} className={`reveal ${className}`} data-effect={effect} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}

export function FaqList({ faqs, numbered = false, expandAll = false }: { faqs: readonly Faq[]; numbered?: boolean; expandAll?: boolean }) {
  return <div className="faq-list">{faqs.map((faq, index) => <details key={faq.question} open={expandAll || undefined}><summary>{numbered && <span className="faq-number">0{index + 1}</span>}<span className="faq-question">{faq.question}</span><span className="faq-plus" aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>;
}

/** Opens or closes every FAQ in the nearest section. */
export function FaqToggleAll({ className = "" }: { className?: string }) {
  const [expanded, setExpanded] = useState(false);
  return <button type="button" className={className} onClick={event => {
    const next = !expanded;
    event.currentTarget.closest("section")?.querySelectorAll("details").forEach(item => { item.open = next; });
    setExpanded(next);
  }}>{expanded ? "Collapse All FAQs" : "View All FAQs"} <Arrow /></button>;
}

export function ContactForm({ variant }: { variant: "boxed" | "card" }) {
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState<"idle" | "working" | "draft" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  // An unhydrated form must not fall back to a native GET with inquiry text
  // in the URL. Calling remains available without client JavaScript.
  useEffect(() => { setHydrated(true); }, []);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hydrated || status === "working") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const inquiry: Inquiry = { name: String(values.get("name") || ""), phone: String(values.get("phone") || ""), email: String(values.get("email") || ""), service: String(values.get("service") || ""), message: String(values.get("message") || ""), website: String(values.get("website") || "") };
    const error = validateInquiry(inquiry);
    if (error) { setStatus("error"); setMessage(error); return; }
    if (siteSettings.contactMode === "email") {
      window.location.href = buildEmailDraft(business.email, inquiry);
      setStatus("draft"); setMessage(`Your email app should open with your request. Press Send there to submit it. If nothing opened, call us at ${business.phone}.`);
      return;
    }
    setStatus("working"); setMessage("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(siteSettings.contactEndpoint!, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...inquiry, formId: "service-request", submissionId: crypto.randomUUID() }), signal: controller.signal, credentials: "omit" });
      const result: unknown = await response.json();
      if (!response.ok || !isAcceptedResponse(result)) throw new Error("The server did not confirm your request.");
      setStatus("success"); setMessage("Thank you. Your request was received, and our team will get back to you as soon as possible."); form.reset();
    } catch {
      setStatus("error"); setMessage(`We couldn’t confirm delivery. Please try again or call us at ${business.phone}. Your message is still here.`);
    } finally { window.clearTimeout(timeout); }
  }
  const card = variant === "card";
  const field = (label: string, input: ReactNode, wide = false) => <label className={`form-field${wide ? " is-wide" : ""}`}><span className={card ? "field-label" : "visually-hidden"}>{label}</span>{input}</label>;
  return <form className={`contact-form contact-form-${variant}`} onSubmit={onSubmit} aria-label="Request a service" noValidate={false}>
    <div className="form-grid">
      {field("Name *", <input name="name" autoComplete="name" placeholder={card ? "Your full name" : "Name *"} required minLength={2} maxLength={120} />)}
      {field("Phone *", <input name="phone" type="tel" autoComplete="tel" placeholder={card ? "(xxx) xxx-xxxx" : "Phone *"} required maxLength={40} />)}
      {field("Email *", <input name="email" type="email" autoComplete="email" placeholder={card ? "you@example.com" : "Email *"} required maxLength={254} />, !card)}
      {card && field("Service Needed", <span className="select-wrap"><select name="service" defaultValue=""><option value="">Select a service</option>{siteContent.capabilities.map(item => <option key={item.title} value={item.title}>{item.title}</option>)}</select></span>)}
      {field(card ? "Message" : "Message *", <textarea name="message" rows={card ? 2 : 3} minLength={10} maxLength={4000} placeholder={card ? "Tell us a little about your needs..." : "Message *"} required />, true)}
    </div>
    <div className="honey-field" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button type="submit" className="form-submit" disabled={!hydrated || status === "working"}>{status === "working" ? "Sending…" : "Send Message"}<Arrow /></button>
    <noscript><p className="form-helper">Please call us at <a href={business.phoneHref}>{business.phone}</a> to request service.</p></noscript>
    <p className={`form-status status-${status}`} role="status" aria-live="polite">{message}</p>
  </form>;
}

/** Footer modelled on kandrhvac.com/contact: logo, location and phone, then the copyright bar. */
export function ContactFooter({ logoHref = "#top", withNav = true }: { logoHref?: string; withNav?: boolean }) {
  return <footer className="kr-footer">
    <div className="kr-footer-top">
      <div className="kr-footer-inner" data-anim="up">
        <a href={logoHref} className="kr-footer-logo" aria-label={logoHref === "#top" ? "Back to top" : `${business.name} website`}><Logo inverse /></a>
        {withNav && <nav className="kr-footer-nav" aria-label="Footer navigation">{siteContent.nav.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>}
        <div className="kr-footer-info"><span><PinIcon />{business.location}</span><a href={business.phoneHref}><PhoneIcon />{business.phone}</a></div>
      </div>
    </div>
    <div className="kr-footer-bottom"><span>Copyright © {new Date().getFullYear()} <a href="https://kandrhvac.com/">{business.name}</a>. All Rights Reserved</span> | <a href="https://kandrhvac.com/privacy-policy/">Privacy Policy</a></div>
  </footer>;
}

export function DesignSwitcher({ active }: { active: "design-1" | "design-2" }) {
  if (siteSettings.isProduction) return null;
  return <nav className="design-switcher" aria-label="Design review navigation"><Link className="switcher-back" href="/" aria-label="Back to both designs"><span aria-hidden="true">⊞</span><span>All designs</span></Link><span className="switcher-divider" /><Link href="/design-1/" aria-current={active === "design-1" ? "page" : undefined}>A <span>Bright &amp; Open</span></Link><Link href="/design-2/" aria-current={active === "design-2" ? "page" : undefined}>B <span>Midnight Classic</span></Link></nav>;
}
