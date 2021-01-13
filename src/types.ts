import { getPropTypes, Options, PropTypeable } from 'prop-types-ts'
import * as t from 'io-ts'
import React, { WeakValidationMap } from 'react'

const dateStringRegex = /^\d{4}\/\d{2}\/\d{2}$/

interface DateStringBrand {
  readonly DateString: unique symbol
}

export const DateString = t.brand(
  t.string,
  (value): value is t.Branded<string, DateStringBrand> => dateStringRegex.test(value),
  'DateString'
)
export type DateString = t.TypeOf<typeof DateString>

const PageMetadataRequired = t.type({
  /// Page Title
  title: t.string,
  /// Page Revision, roughly in semver form
  revision: t.string,
  /// The date the page was last revised, in YYYY/MM/DD form
  revised: DateString,
})

const PageMetadataOptional = t.partial({
  /// The author of the page
  author: t.string,
  /// The date after which I should look at the page again, in YYYY/MM/DD form
  expires: DateString,
  /// A one-line abstract
  abstract: t.string,
  /// The copyright year.  Will default to the year last revised.
  copyright: t.string,
})

export const PageMetadata = t.intersection([PageMetadataRequired, PageMetadataOptional], 'PageMetadata')
export type PageMetadata = t.TypeOf<typeof PageMetadata>

export const Page = t.interface(
  {
    name: t.string,
    metadata: PageMetadata,
  },
  'Page'
)
export type Page = t.TypeOf<typeof Page>

export const fc_props = <T extends PropTypeable>(
  Component: React.FC<t.TypeOf<T>>,
  type: T,
  options?: Options
): React.FC<t.TypeOf<T>> => {
  if (process.env.NODE_ENV !== 'production') {
    const propsTypes = getPropTypes(type, options)
    Component.propTypes = (propsTypes as unknown) as WeakValidationMap<T>
    Component.displayName = type.name.replace('Props', '')
    return Component
  }
  return Component
}

export const ArticlesProps = t.interface({ pages: t.array(Page) }, 'ArticlesProps')
export type ArticlesProps = t.TypeOf<typeof ArticlesProps>
