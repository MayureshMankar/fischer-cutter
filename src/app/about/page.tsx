import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Sri Devi Engineers - 30 Years of Precision Engineering Heritage",
  description: "Learn about the heritage of Sri Devi Engineers. Established in 1994, we are a leading surface grinding workshop in Mumbai with expertise in high-tolerance industrial reconditioning.",
  keywords: ["Engineering Heritage Mumbai", "Vinod Shetty Sri Devi Engineers", "Industrial Workshop Mumbai", "Manufacturing Excellence India", "Precision Reconditioning Legacy"],
  openGraph: {
    title: "Our Heritage | Sri Devi Engineers Mumbai",
    description: "Thirty years of mechanical precision and industrial engineering excellence in Mumbai's heavy manufacturing sector.",
    url: "https://srideviengineers.com/about",
    siteName: "Sri Devi Engineers",
    images: [
      {
        url: "/images/5.png",
        width: 1200,
        height: 630,
        alt: "Sri Devi Engineers Heritage Workshop",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
