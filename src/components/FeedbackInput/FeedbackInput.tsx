import { ChangeEventHandler } from 'react'

import { css } from '@emotion/react'

import { FormConfigTheme } from '../../types/FormConfig'
import { Nullable } from '../../types/Nullable'

type BadFeedbackInputProps = {
  satisfactionLevel: number
  feedbackText: string
  formTheme: FormConfigTheme
  onSetFeedbackText: (value: string) => void
  errorMessage: Nullable<string>
}

const attrs = {
  rows: 3,
}
export const FeedbackInput = (props: BadFeedbackInputProps) => {
  const textareaStyles = css({
    width: '100%',
    minWidth: '100%',
    boxSizing: 'border-box',
    outlineColor: props.formTheme.buttonBackgroundColor, // todo add color for outline
    borderRadius: props.formTheme.textInputBorderRadius,
    display: 'block',
    marginBottom: '14px',
  })
  const onChangeText: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    props.onSetFeedbackText(event.target.value)
  }
  if ([5, 4].includes(props.satisfactionLevel)) {
    return (
      <>
        <p>Great! Would you like to give some additional feedback?</p>
        <textarea
          {...attrs}
          css={textareaStyles}
          onChange={onChangeText}
          value={props.feedbackText}
          name="good-feedback-text"
        />
      </>
    )
  }
  return (
    <>
      <p>How can we improve?</p>
      <textarea
        {...attrs}
        onChange={onChangeText}
        css={textareaStyles}
        value={props.feedbackText}
        name="bad-feedback-text"
      />
    </>
  )
}
