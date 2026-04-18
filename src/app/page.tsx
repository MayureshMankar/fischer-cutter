import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Sri Devi Engineers | Precision Surface Grinding & Reconditioning Mumbai",
  description: "Specialized in high-tolerance surface grinding, Fischer Cutter reconditioning, and industrial machining for 30 years in Mumbai. Authorized engineering workshop for heavy-duty manufacturing.",
  keywords: ["Surface Grinding Mumbai", "Fischer Cutter Blades", "Industrial Reconditioning Mumbai", "Precision Engineering", "Heavy Duty Machining India"],
  openGraph: {
    title: "Sri Devi Engineers | Precision Manufacturing Mumbai",
    description: "Industry-leading surface grinding and industrial reconditioning services based in Mumbai since 1994.",
    url: "https://srideviengineers.com",
    siteName: "Sri Devi Engineers",
    images: [
      {
        url: "/images/about.png",
        width: 1200,
        height: 630,
        alt: "Sri Devi Engineers Industrial Workshop Mumbai",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function Home() {
  return <HomeClient />;
}
