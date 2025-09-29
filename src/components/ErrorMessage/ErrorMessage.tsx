import { css } from '@emotion/react'

import { Nullable } from '../../types/Nullable'

type ErrorMessageProps = {
  message: Nullable<string>
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div
      css={css({
        color: '#f44336',
        height: '20px',
      })}
    >
      {message}
    </div>
  )
}
