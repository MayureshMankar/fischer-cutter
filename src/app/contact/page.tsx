import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Sri Devi Engineers Mumbai - Industrial Enquiries",
  description: "Get in touch with Sri Devi Engineers in Mumbai. Providing expert technical consulting and precision grinding project quotes. Visit our Sakinaka workshop for high-tolerance machining solutions.",
  keywords: ["Contact Engineering Workshop Mumbai", "Sri Devi Engineers Address", "Sakinaka Machining Facility", "Industrial Grinding Quote", "Precision Engineering Mumbai Contact"],
  openGraph: {
    title: "Contact Sri Devi Engineers | Mumbai Heavy Industry",
    description: "Connect with Mumbai's leading precision grinding and reconditioning experts for your next industrial project.",
    url: "https://srideviengineers.com/contact",
    siteName: "Sri Devi Engineers",
    images: [
      {
        url: "/images/7.png",
        width: 1200,
        height: 630,
        alt: "Contact Sri Devi Engineers Mumbai HQ",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
