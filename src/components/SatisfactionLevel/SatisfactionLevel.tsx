import { css } from '@emotion/react'

import { Nullable } from '../../types/Nullable'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'

import { SatisfactionLevelInput } from './components/SatisfactionLevelInput'

type SatisfactionLevelProps = {
  onChange: (value: number) => void
  value: Nullable<number>
  errorMessage: Nullable<string>
}

const list = [
  'Completely disappointed',
  'Disappointed',
  'Neutral',
  'Like',
  'Fully satisfied',
]
export const SatisfactionLevel = (props: SatisfactionLevelProps) => {
  const styles = css({
    display: 'flex',
    listStyleType: 'none',
    paddingLeft: 0,
  })
  return (
    <>
      <p>How satisfied are you with the product details provided to you here?</p>
      <ul css={styles}>
        {list.map((title, i) => (
          <li key={title}>
            <SatisfactionLevelInput
              onChange={props.onChange}
              filled={props.value ? props.value >= i + 1 : false}
              checked={props.value === i + 1}
              title={title}
              value={i + 1}
            />
          </li>
        ))}
      </ul>
      <ErrorMessage message={props.errorMessage} />
    </>
  )
}
