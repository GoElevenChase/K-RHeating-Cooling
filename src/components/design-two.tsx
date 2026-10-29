import { siteContent } from "@/content/site";
import type { CSSProperties } from "react";
import { Arrow, ContactFooter, ContactForm, FaqList, MotionEffects, PhoneIcon, PinIcon, Reveal, SiteHeader, SplitWords } from "@/components/shared";
import "@/app/design-two.css";

const { business } = siteContent;

const serviceLinks = { "air-conditioners": "#air-conditioners", furnaces: "#furnaces", ductless: "#ductless", "commercial-hvac": "#about" };

const serviceBlurbs: Record<string, string> = {
  "air-conditioners": "Stay cool when it matters most.",
  furnaces: "Keep your home warm and efficient.",
  "commercial-hvac": "Reliable systems for your business.",
};

const showcases = [
  { id: "air-conditioners", label: "Air Conditioners", title: <>Cooling that works<br />when you need it.</>, text: "From quick repairs to new installations, we keep your AC system running efficiently so your home or business stays cool and comfortable, even during the hottest days in Kerrville.", image: "/images/outdoor-condensers.jpg", alt: "Two outdoor air conditioning condensers beside a home" },
  { id: "furnaces", label: "Furnaces", title: <>Reliable heat for<br />colder days.</>, text: "Our furnace services help you stay warm and safe throughout the winter. We handle repairs, maintenance, and installations to keep your system running when you need it most.", image: "/images/indoor-furnace-units.jpg", alt: "Indoor furnace and air handler units installed during a project" },
  { id: "ductless", label: "Ductless", title: <>Comfort for every<br />kind of space.</>, text: "Ductless systems are a smart solution for homes, additions, and businesses. They offer efficient heating and cooling with flexible installation options.", image: "/images/ductless-mini-split.jpg", alt: "Wall-mounted ductless mini-split unit in a bright room" },
];

function Kicker({ children }: { children: string }) {
  return <p className="two-kicker"><span aria-hidden="true" />{children}</p>;
}

export function DesignTwo() {
  return <div className="design-two" id="top">
    <MotionEffects />
    <SiteHeader theme="dark" serviceLinks={serviceLinks} />
    <main id="main-content">
      <section className="two-hero" data-spotlight aria-labelledby="two-hero-title">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="two-hero-photo" data-parallax="0.14" src="/images/condensers-stone-wall.jpg" alt="A row of new outdoor condenser units installed along a stone building" />
        <div className="two-container">
          <Reveal className="two-hero-copy"><Kicker>Heating &amp; Cooling Services in Kerrville, TX</Kicker><h1 id="two-hero-title"><SplitWords lines={["Comfort, handled", "with care."]} /></h1><p>K&amp;R Heating &amp; Cooling provides reliable heating and cooling services for homes and businesses in Kerrville, TX and surrounding areas.</p><div className="two-actions"><a className="two-button" href="#contact">Book Your Service <Arrow /></a><a className="two-button two-button-ghost" href="#services">Explore Services</a></div></Reveal>
        </div>
      </section>

      <section id="services" className="two-services" aria-label="Our services">
        <div className="two-container two-services-grid">
          {siteContent.services.map((service, index) => <Reveal key={service.id} className="two-service" delay={index * 60}><a href={serviceLinks[service.id as keyof typeof serviceLinks]}><span className="two-service-number">0{index + 1}</span><h2>{service.title}</h2><p>{serviceBlurbs[service.id] ?? service.summary}</p><Arrow /></a></Reveal>)}
        </div>
      </section>

      <div className="two-showcases">
        {showcases.map((item, index) => <section key={item.id} id={item.id} className={`two-showcase${index % 2 ? " is-reversed" : ""}`} aria-labelledby={`${item.id}-title`}>
          <div className="two-showcase-media" data-anim={index % 2 ? "wipe-left" : "wipe"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.alt} loading="lazy" />
          </div>
          <Reveal className="two-showcase-copy" effect={index % 2 ? "left" : "right"}><Kicker>{item.label}</Kicker><h2 id={`${item.id}-title`}>{item.title}</h2><p>{item.text}</p><a className="two-text-link" href="#contact">Learn More <Arrow /></a></Reveal>
        </section>)}
      </div>

      <section id="about" className="two-capabilities" data-spotlight aria-labelledby="two-capabilities-title">
        <div className="two-container two-capabilities-grid">
          <Reveal className="two-capabilities-intro"><Kicker>Our Capabilities</Kicker><h2 id="two-capabilities-title">Complete HVAC services for your home and business.</h2><p>From routine maintenance to emergency repairs, K&amp;R Heating &amp; Cooling is here to keep your systems running at their best.</p><a className="two-button" href="#contact">Book Your Service <Arrow /></a></Reveal>
          <Reveal className="two-capability-list" delay={60}><ol>{siteContent.capabilities.map((item, index) => <li key={item.title} style={{ "--i": index } as CSSProperties}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ol></Reveal>
          <Reveal className="two-process" delay={120}><Kicker>Our Process</Kicker><h2>A simple process.<br />Real solutions.</h2><ol>{siteContent.process.map((step, index) => <li key={step.title} style={{ "--i": index } as CSSProperties}><span className="two-step-number">{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></Reveal>
        </div>
      </section>

      <section id="faq" className="two-faq" aria-labelledby="two-faq-title">
        <div className="two-container two-faq-grid">
          <Reveal><Kicker>Frequently Asked Questions</Kicker><h2 id="two-faq-title">Common questions,<br />quick answers.</h2></Reveal>
          <Reveal delay={80}><FaqList faqs={siteContent.faqs.care} /></Reveal>
        </div>
      </section>

      <section id="contact" className="two-contact" aria-labelledby="two-contact-title">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="two-contact-photo" data-parallax="0.1" src="/images/commercial-job-site.jpg" alt="" loading="lazy" />
        <div className="two-container two-contact-grid">
          <Reveal className="two-contact-copy"><Kicker>Get In Touch</Kicker><h2 id="two-contact-title">Ready for reliable<br />heating and cooling?</h2><p>Fill out the form below and our team will get back to you as soon as possible. You can also call us directly.</p>
            <div id="service-areas" className="two-contact-details"><a href={business.phoneHref}><PhoneIcon />{business.phone}</a><span><PinIcon />{business.location}</span></div>
          </Reveal>
          <Reveal className="two-contact-card" delay={80} effect="zoom"><ContactForm variant="card" /></Reveal>
        </div>
      </section>
    </main>

    <ContactFooter />
  </div>;
}
