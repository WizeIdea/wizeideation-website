import './globals.css';
import NavMenu from '@/components/NavMenu';
import Seo from '@/components/Seo';
import { FC, ReactNode } from 'react';

export const metadata = {
  title: {
    default: 'Wize Ideation – Tactical Intellectual Research',
    template: '%s | Wize Ideation'
  },
  description:
    'A high‑end research archive for stylometric alignment, AI persona architecture, and forensic linguistics.',
  openGraph: {
    images: [{ url: '/banner-sunrise.jpg', alt: 'Sunrise over cracked salt flats' }]
  }
};

type Props = {
  children: ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Global SEO defaults – can be overridden per page */}
        <Seo
          title={metadata.title.default}
          description={metadata.description}
          image={metadata.openGraph.images[0].url}
        />
      </head>
      <body className="bg-saltWhite text-striationCharcoal antialiased">
        <NavMenu />
        <main className="max-w-7xl mx-auto py-8 px-4">{children}</main>
        <footer className="border-t border-dpmOlive py-4 text-center text-sm text-dpmOlive">
          © {new Date().getFullYear()} Wize Ideation. All rights reserved.
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;