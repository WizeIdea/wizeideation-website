// components/Seo.tsx
'use client';          // <‑‑ 👈 this line makes the file a client component

import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export interface SeoProps {
  title: string;
  description: string;
  /** optional extra meta tags (ORCID, DOI, …) */
  meta?: Record<string, string>;
  /** optional Open‑Graph image */
  image?: string;
}

const Seo: FC<SeoProps> = ({ title, description, meta = {}, image }) => {
  const pathname = usePathname();                     // client‑side hook – now allowed
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wizeidea.com';

  const metaTags = Object.entries(meta).map(([k, v]) => (
    <meta key={k} name={k} content={v} />
  ));

  return (
    <Head>
      <title>{title} | Wize Ideation</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={`${siteUrl}${pathname}`} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${siteUrl}${pathname}`} />
      <meta property="og:type" content="website" />
      {metaTags}
      {/* favicons */}
      <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
      <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  );
};

export default Seo;