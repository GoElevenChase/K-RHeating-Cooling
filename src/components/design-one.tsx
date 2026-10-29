import type { CSSProperties } from "react";
import { siteContent } from "@/content/site";
import { Arrow, ContactFooter, ContactForm, FaqList, FaqToggleAll, Logo, MotionEffects, Reveal, SiteHeader, SplitWords } from "@/components/shared";
import "@/app/design-one.css";

const { business } = siteContent;

function Kicker({ children }: { children: string }) {
  return <p className="one-kicker">{children}<span aria-hidden="true" /></p>;
}

function HighlightIcon({ kind }: { kind: "pin" | "shield" | "team" }) {
  const paths = {
    pin: <><path d="M12 21.5s-7-6.2-7-11.7a7 7 0 0 1 14 0c0 5.5-7 11.7-7 11.7Z" /><circle cx="12" cy="9.8" r="2.6" /></>,
    shield: <><path d="M12 2.8 4.5 5.6v5.9c0 4.6 3.1 8.4 7.5 9.7 4.4-1.3 7.5-5.1 7.5-9.7V5.6L12 2.8Z" /><path d="m8.6 12 2.3 2.3 4.6-4.6" /></>,
    team: <><circle cx="8" cy="8" r="3" /><circle cx="16.5" cy="8.5" r="2.5" /><path d="M2.5 20v-1.5A5.5 5.5 0 0 1 8 13a5.5 5.5 0 0 1 5.5 5.5V20M14.5 13.4a4.5 4.5 0 0 1 7 3.7V20" /></>,
  };
  return <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">{paths[kind]}</svg>;
}

export function DesignOne() {
  return <div className="design-one" id="top">
    <MotionEffects />
    <SiteHeader theme="light" serviceLinks={{}} />
    <main id="main-content">
      <section className="one-hero" aria-labelledby="one-hero-title">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="one-hero-photo" data-parallax="0.12" src="/images/outdoor-condensers.jpg" alt="Two outdoor air conditioning condenser units installed beside a home" />
        <div className="one-container one-hero-inner">
          <Reveal className="one-hero-copy">
            <Kicker>Heating &amp; Cooling Services</Kicker>
            <h1 id="one-hero-title"><SplitWords lines={["Comfort you can", "count on. Service", "you can trust."]} /></h1>
            <p>From AC repairs to new system installations, K&amp;R Heating &amp; Cooling keeps your home or business comfortable in every season. We’re proud to serve Kerrville and the surrounding areas with reliable, professional HVAC services.</p>
            <div className="one-actions"><a className="one-button" href="#contact">Book Your Service <Arrow /></a><a className="one-button one-button-outline" href="#services">Our Services</a></div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="one-services" aria-labelledby="one-services-title">
        <div className="one-container one-services-grid">
          <Reveal className="one-services-intro"><Kicker>Our Services</Kicker><h2 id="one-services-title">How can we help<br />you today?</h2><p>Select a service below to learn more.</p></Reveal>
          {siteContent.services.map((service, index) => <Reveal key={service.id} className="one-service" delay={index * 60}><a href="#contact" aria-label={`${service.title}: ${service.summary} Request this service`}><span className="one-service-number">0{index + 1}</span><h3>{service.title}</h3><p>{service.summary}</p><Arrow /></a></Reveal>)}
        </div>
      </section>

      <section id="about" className="one-features" aria-label="About K&R Heating & Cooling">
        <div className="one-feature one-feature-solutions">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-anim="wipe" src="/images/condenser-brick-wall.jpg" alt="Outdoor air conditioning condenser next to a brick wall" loading="lazy" />
          <Reveal className="one-feature-copy" effect="left"><Kicker>Residential &amp; Commercial</Kicker><h2>Complete HVAC<br />Solutions</h2><p>Whether it’s a quick repair or a complete system installation, we provide expert service for homes and businesses. We work with all makes and models to get the job done right.</p><a className="one-text-link" href="#services">Learn More <Arrow /></a></Reveal>
        </div>
        <div className="one-feature one-feature-trust">
          <div className="one-feature-frame" data-anim="wipe-up">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ductless-mini-split.jpg" alt="Wall-mounted ductless mini-split unit in a bright room" loading="lazy" />
          </div>
          <Reveal className="one-feature-copy" delay={80} effect="left"><Kicker>Our Philosophy</Kicker><h2>Built on Trust.<br />Focused on You.</h2><p>We believe in honest recommendations, quality workmanship, and treating every customer like family. Your comfort is our priority, and we always provide clear options so you can make the best decision for your home or business.</p><a className="one-text-link" href="#service-areas">About Us <Arrow /></a></Reveal>
        </div>
      </section>

      <section className="one-emergency" data-spotlight aria-labelledby="one-emergency-title">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="one-emergency-photo" data-parallax="-0.1" src="/images/rooftop-unit-lift.jpg" alt="Technicians setting a rooftop HVAC unit into place" loading="lazy" />
        <div className="one-container">
          <Reveal className="one-emergency-copy"><Kicker>When You Need Us Most</Kicker><h2 id="one-emergency-title">24/7 Emergency HVAC Repair</h2><p>HVAC problems don’t wait, and neither do we. Our team is available 24/7 for emergency service when you need it most.</p><a className="one-button one-button-gold" href={business.phoneHref}>Call {business.phone} <Arrow /></a></Reveal>
        </div>
      </section>

      <section id="service-areas" className="one-local" aria-labelledby="one-local-title">
        <div className="one-container one-local-grid">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-anim="wipe" src="/images/kr-truck-job-site.jpg" alt="K&R Heating & Cooling truck parked at a commercial job site" loading="lazy" />
          <Reveal className="one-local-copy" effect="right"><Kicker>Proudly Serving</Kicker><h2 id="one-local-title">Your Local HVAC Experts<br />in Kerrville, TX</h2><p>We’re honored to be part of the Kerrville community, providing dependable heating and cooling services to local homeowners and businesses.</p>
            <ul className="one-highlights">
              <li style={{ "--i": 0 } as CSSProperties}><HighlightIcon kind="pin" /><span><strong>Kerrville, TX</strong>and surrounding areas</span></li>
              <li style={{ "--i": 1 } as CSSProperties}><HighlightIcon kind="shield" /><span><strong>All Makes</strong>and Models</span></li>
              <li style={{ "--i": 2 } as CSSProperties}><HighlightIcon kind="team" /><span><strong>Certified</strong>Technicians</span></li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="one-faq" aria-labelledby="one-faq-title">
        <div className="one-container one-faq-grid">
          <Reveal className="one-faq-intro"><Kicker>Frequently Asked Questions</Kicker><h2 id="one-faq-title">Quick Answers<br />to Common Questions</h2><p>Find helpful information about our services, process, and what to expect.</p><FaqToggleAll className="one-text-link one-faq-toggle" /></Reveal>
          <Reveal delay={80}><FaqList faqs={siteContent.faqs.basics} numbered /></Reveal>
        </div>
      </section>

      <section id="contact" className="one-contact" aria-labelledby="one-contact-title">
        <div className="one-contact-panel" data-spotlight>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/outdoor-unit-closeup.jpg" alt="" loading="lazy" data-parallax="0.08" />
          <div className="one-contact-brand" data-anim="zoom"><Logo inverse /><p>Call us or send a message — we’re here to help<br />with all your heating and cooling needs.</p></div>
        </div>
        <Reveal className="one-contact-form" effect="right"><Kicker>Get In Touch</Kicker><h2 id="one-contact-title">Request a Service or<br />Get a Free Estimate</h2><p>Have a question or need service? Fill out the form below and we’ll get back to you as soon as possible.</p><ContactForm variant="boxed" /></Reveal>
      </section>
    </main>

    <ContactFooter />
  </div>;
}
