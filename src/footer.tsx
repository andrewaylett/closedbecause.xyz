import React from 'react'
import { getYear } from 'date-fns'
import * as t from 'io-ts'
import { fc_props } from './types'

const FooterProps = t.partial(
  {
    author: t.string,
    copyright: t.string,
  },
  'FooterProps'
)
type FooterProps = t.TypeOf<typeof FooterProps>

const Footer: React.FunctionComponent<FooterProps> = fc_props(
  ({ author, copyright }) => (
    <footer style={{ paddingTop: '1em' }}>
      Copyright © {author || 'Andrew Aylett'}, {copyright || getYear(Date.now())}
    </footer>
  ),
  FooterProps
)

export default Footer
