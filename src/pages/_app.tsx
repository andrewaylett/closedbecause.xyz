import App from 'next/app'
import 'normalize.css'
import './global.scss'
import React from 'react'
import { AppProps } from 'next/dist/pages/_app'
import { MDXProvider, MDXProviderComponentsProp } from '@mdx-js/react'
import Link from 'next/link'
import Footer from '../footer'
import Head from 'next/head'
import { github_url } from '../github'
import { fc_props, PageMetadata } from '../types'
import { PathReporter } from 'io-ts/PathReporter'
import * as t from 'io-ts'
import { ReactChild } from 'prop-types-ts'

const OptionalProps = t.partial({ text: t.string }, 'OptionalProps')

const Optional = fc_props(({ text, children }) => <>{text ? <span>{children}</span> : null}</>, OptionalProps)

const RevisionsProps = t.intersection([PageMetadata, t.interface({ url: t.string })], 'RevisionsProps')

const Revisions = fc_props(
  ({ revision, revised, expires, url }) => (
    <>
      {revision || revised || expires ? (
        <div className="revisions">
          <Optional text={revision}>Version:&nbsp;{revision}</Optional>
          <Optional text={revised}>
            <a href={github_url(url)}>Last Revised:&nbsp;{revised}</a>
          </Optional>
          <Optional text={expires}>Expires:&nbsp;{expires}</Optional>
        </div>
      ) : (
        ''
      )}
    </>
  ),
  RevisionsProps
)

const WrapperProps = t.interface(
  {
    metadata: PageMetadata,
    children: ReactChild,
  },
  'WrapperProps'
)
type WrapperProps = t.TypeOf<typeof WrapperProps>

const components: (url: string) => MDXProviderComponentsProp = (url) => ({
  wrapper: fc_props((props: WrapperProps) => {
    const { children, metadata: hopefullyMetadata } = props
    const decoded = PageMetadata.decode(hopefullyMetadata)
    if (decoded._tag !== 'Right') {
      throw PathReporter.report(decoded)
    }
    const metadata = decoded.right
    return (
      <div className="mdx">
        <Head>
          <title>{metadata.title} - aylett.co.uk</title>
        </Head>
        <nav>
          <Link href="/">Home</Link>
        </nav>
        <header>
          <h1>{metadata.title}</h1>
          {metadata.abstract ? metadata.abstract : ''}
          <div className="meta">
            {metadata.author ? <div className="author">Author: {metadata.author}</div> : ''}
            <Revisions url={url} {...metadata} />
          </div>
        </header>
        <main>{children}</main>
        <Footer author={metadata.author} copyright={metadata.copyright || metadata.revised.split('/')[0]} />
      </div>
    )
  }, WrapperProps),
})

const WrappedApp: React.VoidFunctionComponent<AppProps> = (props, context) => (
  <MDXProvider components={components(props.router.asPath)}>
    <App {...props} context={context} />
  </MDXProvider>
)

// noinspection JSUnusedGlobalSymbols
export default WrappedApp
