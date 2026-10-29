/**
 * The shared business content for both visual directions.
 * Facts come from K&R Heating & Cooling's current website (kandrhvac.com).
 * Keep genuine business information here so changing a design never changes the offer.
 */
export interface SiteContent {
  readonly business: {
    readonly name: string;
    readonly phone: string;
    readonly phoneHref: string;
    readonly location: string;
    readonly address: string;
    readonly hours: string;
    /** Destination for the contact form's email draft. Not shown in either design. */
    readonly email: string;
    readonly url: string;
    readonly tagline: string;
    readonly description: string;
  };
  readonly services: readonly {
    readonly id: string;
    readonly title: string;
    readonly summary: string;
  }[];
  readonly capabilities: readonly {
    readonly title: string;
    readonly description: string;
  }[];
  readonly process: readonly {
    readonly title: string;
    readonly description: string;
  }[];
  readonly faqs: {
    readonly basics: readonly Faq[];
    readonly care: readonly Faq[];
  };
  readonly nav: readonly {
    readonly label: string;
    readonly href: string;
  }[];
}

export interface Faq {
  readonly question: string;
  readonly answer: string;
}

export const siteContent: SiteContent = {
  business: {
    name: "K&R Heating & Cooling",
    phone: "830-792-3993",
    phoneHref: "tel:+18307923993",
    location: "Kerrville, TX",
    address: "410 Cotton Gin Lane, Kerrville, TX 78028",
    hours: "Monday – Sunday: Open 24 hours",
    // The current website lists no public email address. Replace with the
    // client's verified inbox; the production config check rejects this value.
    email: "REPLACE_ME@kandrhvac.com",
    url: "https://kandrhvac.com",
    tagline: "Heating & Cooling Services in Kerrville, TX",
    description:
      "K&R Heating & Cooling provides AC, furnace, ductless, and commercial HVAC repair, maintenance, and installation for homes and businesses in Kerrville, TX and the surrounding areas. 24/7 emergency service.",
  },
  services: [
    { id: "air-conditioners", title: "Air Conditioners", summary: "Stay cool and comfortable all summer long." },
    { id: "furnaces", title: "Furnaces", summary: "Reliable heat when you need it most." },
    { id: "ductless", title: "Ductless", summary: "Flexible comfort for any space." },
    { id: "commercial-hvac", title: "Commercial HVAC", summary: "Keep your business running smoothly." },
  ],
  capabilities: [
    { title: "AC Repair", description: "Fast, dependable service when you need it." },
    { title: "Furnace Service", description: "Keep your heating system working reliably." },
    { title: "Ductless Systems", description: "Efficient comfort, installed with care." },
    { title: "Commercial HVAC", description: "For businesses of all sizes." },
    { title: "Maintenance", description: "Prevent problems and extend system life." },
    { title: "24/7 Emergency Service", description: "Help when you need it most." },
  ],
  process: [
    { title: "Diagnose", description: "We inspect your system and find the issue." },
    { title: "Explain your options", description: "We walk you through the best solutions for your needs." },
    { title: "Complete the service", description: "We get your system back up and running." },
  ],
  faqs: {
    basics: [
      {
        question: "Do you service all makes and models?",
        answer: "Yes. We service all makes and models of heating and cooling systems, and our technicians are trained to perform maintenance on any brand.",
      },
      {
        question: "How much do new systems cost?",
        answer: "The cost depends on your space, the equipment, and the installation. We provide free estimates on new installations, and financing is available for new heating and cooling systems.",
      },
      {
        question: "Do you offer financing?",
        answer: "Yes. We offer financing options for new heating and cooling systems, including flexible options and monthly payments. Contact us to find out more about what’s available.",
      },
      {
        question: "What areas do you serve?",
        answer: "We’re based in Kerrville, TX and serve Kerrville and the surrounding areas, for both homes and businesses. Call 830-792-3993 to confirm service at your location.",
      },
      {
        question: "How quickly can you get to my home or business?",
        answer: "Timing depends on your location and the schedule, so give us a call and we’ll let you know. We offer 24/7 emergency service when you can’t wait.",
      },
    ],
    care: [
      {
        question: "How often should I service my HVAC system?",
        answer: "Our preventive maintenance plan covers a complete inspection and tune-up of your HVAC equipment two times per year, including a 20+ point inspection at each visit.",
      },
      {
        question: "What are the signs my AC or furnace needs repair?",
        answer: "Uneven temperatures, weak airflow, unusual noises or smells, frequent cycling, or higher energy bills can all point to a problem. If something seems off, call us and we’ll take a look.",
      },
      {
        question: "Do you offer emergency service?",
        answer: "Yes. We provide 24/7 emergency service, and we’re open 24 hours, Monday through Sunday. Call 830-792-3993.",
      },
      {
        question: "How long does a typical installation take?",
        answer: "It depends on the system and your space. We’ll explain the timing and your options up front, and estimates on new installations are free.",
      },
      {
        question: "What brands do you work with?",
        answer: "We service all makes and models. For a new system, we’ll walk you through the options that fit your home or business.",
      },
    ],
  },
  nav: [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Service Areas", href: "#service-areas" },
    { label: "Contact", href: "#contact" },
  ],
};
