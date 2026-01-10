import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';

export interface SeoProps {
  title: string;
  description: string;
  /** Optional extra meta tags (e.g., ORCID, DOI) */
  meta?: Record<string, string>;
  /** Open Graph image – typically the sunrise banner */
  image?: string;
}

/**
 * Centralised SEO component.
 * All pages import <Seo /> so we keep the <head> logic in one place.
 */
const Seo: FC<SeoProps> = ({ title, description, meta = {}, image }) => {
  const { pathname } = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wizeidea.com';

  const metaTags = Object.entries(meta).map(([key, value]) => (
    <meta key={key} name={key} content={value} />
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
      {/* Favicons – the browser will pick the best size automatically */}
      <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
      <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  );
};

export default Seo;