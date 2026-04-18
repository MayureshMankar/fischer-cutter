import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Engineering Services | Precision Surface Grinding & Reconditioning",
  description: "Explore our specialized engineering services in Mumbai: High-tolerance surface grinding, heavy-duty machining, industrial reconditioning, and Fischer Cutter blade grinding for the tyre industry.",
  keywords: ["Surface Grinding Services Mumbai", "Industrial Reconditioning India", "Heavy Duty Machining Mumbai", "Fischer Cutter Grinding", "Konsta Knife Sharpening", "Precision Engineering Services"],
  openGraph: {
    title: "Precision Engineering Services | Sri Devi Engineers Mumbai",
    description: "Specialized industrial grinding and reconditioning services for global manufacturing leaders since 1994.",
    url: "https://srideviengineers.com/services",
    siteName: "Sri Devi Engineers",
    images: [
      {
        url: "/images/11.png",
        width: 1200,
        height: 630,
        alt: "Industrial Grinding Services at Sri Devi Engineers",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
