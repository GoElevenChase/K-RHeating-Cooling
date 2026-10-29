import Link from "next/link";
import { Arrow, ContactFooter, Logo, MotionEffects } from "@/components/shared";
import { siteContent } from "@/content/site";

const { business } = siteContent;

const concepts = [
  {
    number: 1,
    href: "/design-1/",
    mood: "Bright · Clean · Approachable",
    title: "Comfort You Can Count On",
    description: "Bright, clean, and approachable. A soft, photo-led hero, a numbered row of services, and a clear path from an everyday comfort problem to a conversation with K&R.",
    tags: "Cool white · Modern sans-serif · Soft, welcoming motion",
    preview: "/previews/design-a.jpg",
    alt: "Opening screen of Design 1: a light page with the headline Comfort you can count on. Service you can trust. beside a photo of two outdoor condenser units",
  },
  {
    number: 2,
    href: "/design-2/",
    mood: "Bold · Classic · Confident",
    title: "Comfort, Handled with Care",
    description: "Confident and classic. Full-bleed photography, serif display type, and alternating service showcases built for getting the right help fast.",
    tags: "Deep navy · Serif display · Cinematic motion",
    preview: "/previews/design-b.jpg",
    alt: "Opening screen of Design 2: a navy hero with the serif headline Comfort, handled with care. over a photo of condenser units along a stone wall",
  },
];

export function DesignChooser() {
  return <div className="chooser-page">
    <MotionEffects />
    <main className="chooser" id="main-content">
      <header className="chooser-header wrap"><span className="brand"><Logo /></span><span className="chooser-prepared">Prepared by ElevenChase</span><span className="chooser-tag">K&amp;R Heating &amp; Cooling · Website directions</span></header>
      <div className="wrap">
        <section className="chooser-intro" aria-labelledby="chooser-title">
          <p className="chooser-eyebrow"><i aria-hidden="true" />A fresh perspective</p>
          <h1 id="chooser-title">Two fresh directions<br />for <em>K&amp;R Heating &amp; Cooling.</em></h1>
          <div className="chooser-intro-bottom"><p>The same local care, expressed two ways. Explore each complete homepage and choose the direction that feels right.</p><span>One local business. Two possibilities. <Arrow /></span></div>
        </section>
        <section className="chooser-grid" aria-label="Explore the two homepage concepts">
          {concepts.map(concept => <article key={concept.number} className="concept-card" data-tilt>
            <div className="concept-preview">
              <div className="preview-window" aria-hidden="true"><i /><i /><i /><small>K&amp;R Heating &amp; Cooling — Design {concept.number}</small></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={concept.preview} width={1440} height={900} alt={concept.alt} />
              <span className="preview-open" aria-hidden="true"><Arrow direction="up" /></span>
            </div>
            <div className="concept-info">
              <div className="concept-topline"><span>Design 0{concept.number}</span><span>{concept.mood}</span></div>
              <h2>{concept.title}</h2>
              <p>{concept.description}</p>
              <p className="concept-tags">{concept.tags}</p>
              <Link className="concept-action" href={concept.href}>Explore Design {concept.number}<Arrow direction="up" /></Link>
            </div>
          </article>)}
        </section>
        <section className="chooser-footnote" aria-label="About this presentation">
          <p>Different first impressions. <em>The same K&amp;R care.</em></p>
          <p>Each direction is a complete, responsive homepage. Use the floating bar to switch designs or return here. Request forms open an email draft; call links go straight to K&amp;R’s existing phone line.</p>
        </section>
      </div>
    </main>
    <ContactFooter logoHref="https://kandrhvac.com/" withNav={false} />
  </div>;
}
