/* eslint-disable arrow-body-style */
import Head from 'next/head'
import React, { memo } from 'react'

const GlobalStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  url: 'https://www.legisbot.com.ar',
  logo: `${process.env.NEXT_PUBLIC_IMAGE_CDN || '/'}_img_/logo-derechoia.png`,
  sameAs: ['https://instagram.com/legisbotok'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+540810-123-4567',
      contactType: 'customer service',
    },
  ],
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Avenida de los Abogados 123',
      addressLocality: 'Buenos Aires',
      addressCountry: 'AR',
    },
  ],
}

interface SEOProps {
  title?: string
  description?: string
  image?: string
  keywords?: string
  url?: string
  jsonStructuredData?: any
  metaRobots?: string
}

const SEO = ({
  title,
  description,
  image,
  keywords,
  url,
  jsonStructuredData,
  metaRobots,
}: SEOProps) => {
  return (
    <Head>
      <meta charSet="utf-8" />

      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />

      <meta name="author" content="Legisbot" />

      <meta name="geo.region" content="AR" />

      <meta name="title" content={title} />

      <meta name="description" content={description} />

      <meta name="keywords" content={keywords} />

      <meta name="og:locale" content="es_LA" />

      <meta name="og:title" content={title} />

      <meta name="og:type" content="website" />

      <meta name="og:url" content={url} />

      <meta name="og:description" content={description} />

      <meta name="og:site_name" content="Legisbot" />

      <meta property="og:image" content={image} />

      <meta property="fb:app_id" content="1234567890" />

      <meta name="robots" content={metaRobots} />

      <link
        rel="shortcut icon"
        href="https://www.derechoia.com/favicon.png"
        type="image/png"
      />

      <link rel="canonical" href={url} />

      <title>{title}</title>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(GlobalStructuredData),
        }}
      />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonStructuredData),
        }}
      />
    </Head>
  )
}

export default memo(SEO)
