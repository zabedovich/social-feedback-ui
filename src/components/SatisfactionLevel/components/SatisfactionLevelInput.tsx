import { ChangeEvent, ChangeEventHandler } from 'react'

import { css } from '@emotion/react'

type SatisfactionLevelInputProps = {
  onChange: (value: number) => void
  title: string
  filled: boolean
  checked: boolean
  value: number
}

export const SatisfactionLevelInput = (props: SatisfactionLevelInputProps) => {
  const inputStyle = css({
    display: 'none',
  })
  const labelStyle = css({
    display: 'inline-block',
    width: '30px',
    position: 'relative',
    height: '30px',
    '::after': {
      content: '"\\2605"',
      color: props.filled ? '#ffc107' : '#FFEB3B',
      position: 'absolute',
      left: 0,
      cursor: 'pointer',
      top: 0,
      fontSize: '24px',
    },
    ':hover': {
      '::after': {
        color: '#ffc107',
      },
    },
  })
  const id = props.title.replace(/\s/g, '-').toLowerCase()
  const onChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number.parseInt(event.target.value)
    if (Number.isNaN(value)) {
      console.error('Satisfaction level must be a number')
    } else {
      props.onChange(value)
    }
  }
  return (
    <>
      <input
        css={inputStyle}
        type="radio"
        name={id}
        id={id}
        onChange={onChange}
        checked={props.checked}
        title={props.title}
        value={props.value}
      />
      <label css={labelStyle} htmlFor={id} title={props.title} />
    </>
  )
}
