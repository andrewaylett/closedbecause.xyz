import Head from 'next/head'
import styles from '../index.module.scss'
import Link from 'next/link'
import React from 'react'
import style from '../articles.module.scss'
import { ArticlesProps, fc_props } from '../types'
import { InferGetStaticPropsType } from 'next'
import { getStaticProps } from '../ssr/articles'

export { getStaticProps } from '../ssr/articles'

// noinspection HtmlUnknownTarget
export const Home: React.VoidFunctionComponent<InferGetStaticPropsType<typeof getStaticProps>> = fc_props(({ pages }) => (
  <div className={styles.container}>
    <Head>
      <title>aylett.co.uk</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className={styles.title}>Closed Because...</h1>

      <p className={styles.description}>Insert &apos;90s &ldquo;site under construction&rdquo; gif here.</p>
      <div className={styles.description}>
        {
          pages.map(({ name, metadata }) => (
          <p key={name}>
            <Link href={`/${name}`}>{metadata.title}</Link>
            {metadata.author ? ` - ${metadata.author}` : ''}
            {metadata.revision ? <span className={style.revision}>{`v${metadata.revision}`}</span> : ''}
            {metadata.abstract ? `: ${metadata.abstract}` : ''}
          </p>
        ))
        }
      </div>
    </main>

    <footer>
      <a href="/_logs" target="_blank" rel="noopener noreferrer">
        Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
      </a>
    </footer>
  </div>
), ArticlesProps)

export default Home
