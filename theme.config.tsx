import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <svg style={{ display: 'inline', verticalAlign: 'middle' }} enable-background="new 0 0 32 32" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
        <path d="m16 5.65c1.97 2.65 7 9.84 7 14.35 0 4.97-2.03 7-7 7s-7-2.03-7-7c0-4.51 5.03-11.7 7-14.35m0-1c-.316 0-.614.149-.803.403-2.688 3.615-7.197 10.365-7.197 14.947 0 5.532 2.467 8 8 8 5.532 0 8-2.468 8-8 0-4.58-4.51-11.331-7.197-14.947-.189-.254-.487-.403-.803-.403z" fill="#2d2220"/>
        <path d="m23 20c0 4.97-2.03 7-7 7-1.75 0-3.13-.25-4.19-.81-.56-1.06-.81-2.44-.81-4.19 0-4.3 4.57-11.04 6.71-13.95 2.27 3.35 5.29 8.45 5.29 11.95z" fill="#31cfff"/>
        <g fill="#2d2220">
            <path d="m13.5 25c-.052 0-.105-.008-.158-.025-1.156-.386-3.342-1.817-3.342-4.475 0-.276.224-.5.5-.5s.5.224.5.5c0 2.594 2.551 3.489 2.659 3.526.261.088.402.372.314.633-.07.209-.265.341-.473.341z"/>
            <path d="m10.5 18.999c-.001 0-.002 0-.002 0-.276-.002-.498-.224-.498-.499 0-.088.024-2.187 2.084-5.277.152-.229.462-.292.693-.139.23.153.292.463.139.693-1.874 2.812-1.916 4.706-1.916 4.726-.003.273-.226.496-.5.496z"/>
            <path d="m17 24.5c0-.276-.224-.5-.5-.5h-1c-.276 0-.5.224-.5.5 0 .276.224.5.5.5h1c.276 0 .5-.224.5-.5z"/>
        </g>
    </svg>
    WatermarkingLLMs
</span>
,
  project: {
    link: 'https://github.com/asmigiulati/watermarking-llms',
  },
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter()
    const { frontMatter } = useConfig()
    const url =
      'https://my-app.com' +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`)
 
    return (
      <>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || 'Nextra'} />
        <meta
          property="og:description"
          content={frontMatter.description || 'The next site builder'}
        />
      </>
    )
  },
    feedback: {
        useLink: () => 'https://tally.so/r/wzqP9k',
    },

    chat: {
    link: 'https://discord.gg/QeUuKbNh',
  },
    gitTimestamp:'Last updated 15th April, 2024',
  docsRepositoryBase: 'https://github.com/asmigiulati/watermarking-llms',
  footer: {
    text: 'AI Simply Explained',
  }
}

export default config
