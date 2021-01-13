declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent

  type DateString = string

  interface Metadata extends Record<string, any> {
    title: string
    author?: string
    copyright?: string
    revision?: string
    revised?: DateString
    expiry?: DateString
  }
  export const metadata: Metadata
}
