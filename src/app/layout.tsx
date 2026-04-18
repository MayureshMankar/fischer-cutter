import type { Metadata } from "next";
import { Montserrat, Roboto, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  weight: ["400", "700", "900"]
});

const roboto = Roboto({ 
  subsets: ["latin"], 
  variable: "--font-roboto",
  weight: ["400", "500", "700"]
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-technical" 
});

export const metadata: Metadata = {
  metadataBase: new URL("https://srideviengineers.com"),
  title: {
    default: "Sri Devi Engineers | Industrial Precision Grinding Mumbai",
    template: "%s | Sri Devi Engineers"
  },
  description: "Thirty years of absolute precision in Mumbai's industrial heart. Specialized in high-tolerance surface grinding, reconditioning, and Fischer Cutter blade sharpening.",
  keywords: ["Surface Grinding Mumbai", "Fischer Cutter Blades", "Industrial Reconditioning India", "Precision Engineering", "Sakinaka Machining"],
  authors: [{ name: "Sri Devi Engineers" }],
  creator: "Sri Devi Engineers",
  publisher: "Sri Devi Engineers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Devi Engineers | Precision Grinding Mumbai",
    description: "Industrial reconditioning and high-tolerance surface grinding since 1994.",
    images: ["/images/about.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sri Devi Engineers",
  "image": "https://srideviengineers.com/images/about.png",
  "description": "Authorized industrial reconditioning and high-tolerance surface grinding in Mumbai since 1994.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "D/6, Ansa Industrial Estate, S V Road, Sakinaka, Andheri East",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400072",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.1069,
    "longitude": 72.8835
  },
  "url": "https://srideviengineers.com",
  "telephone": "+919869671387",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    }
  ],
  "sameAs": []
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
