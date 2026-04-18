import { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Industrial Portfolio | Precision Engineering Case Studies",
  description: "View our portfolio of precision engineering projects in Mumbai. 30 years of proven results in heavy surface grinding, die bolster reconditioning, and technical blade sharpening.",
  keywords: ["Engineering Portfolio Mumbai", "Surface Grinding Case Studies", "Precision Machining Projects", "Industrial Reconditioning Examples", "Mumbai Workshop Results"],
  openGraph: {
    title: "Precision Engineering Portfolio | Sri Devi Engineers Mumbai",
    description: "Proven industrial results in high-tolerance grinding and technical reconditioning since 1994.",
    url: "https://srideviengineers.com/portfolio",
    siteName: "Sri Devi Engineers",
    images: [
      {
        url: "/images/6.png",
        width: 1200,
        height: 630,
        alt: "Sri Devi Engineers Portfolio - Proven Results",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
