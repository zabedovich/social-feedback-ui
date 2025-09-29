import { MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'

import { css } from '@emotion/react'
import dompurify from 'dompurify'

import { saveForm } from '../../api/saveForm'
import { FeedbackInput } from '../../components/FeedbackInput/FeedbackInput'
import { SatisfactionLevel } from '../../components/SatisfactionLevel/SatisfactionLevel'
import { FormConfigTheme } from '../../types/FormConfig'
import { Nullable } from '../../types/Nullable'

type FormError = {
  field: 'satisfaction-level' | 'bad-feedback-type' | 'bad-feedback'
  message: string
}

type InPlaceFormProps = {
  formId: string
  domainId: string
  formTheme: FormConfigTheme
}

export const InPlaceForm = (props: InPlaceFormProps) => {
  const [step, setStep] = useState(1)
  const [isFormSend, setIsFormSend] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [errors, setErrors] = useState<FormError[]>([])
  const [satisfactionLevel, setSatisfactionLevel] = useState<Nullable<number>>(null)
  useEffect(() => {
    satisfactionLevel && setErrors([])
  }, [satisfactionLevel])
  const buttonType = useMemo(() => (step === 2 ? 'submit' : 'button'), [step])
  const buttonStyles = css({
    display: 'inline-block',
    border: 'none',
    fontSize: '18px',
    backgroundColor: props.formTheme.buttonBackgroundColor,
    padding: '15px 30px',
    borderRadius: props.formTheme.buttonBorderRadius,
    cursor: 'pointer',
    color: props.formTheme.buttonTextColor,
    '&:hover': {
      opacity: '0.95',
    },
  })
  const onSubmit = useCallback(async () => {
    try {
      await saveForm({
        feedbackFormId: props.formId,
        link: window.location.pathname,
        rating: satisfactionLevel,
        rawHtml: dompurify.sanitize(document.getElementsByTagName('html')[0] ?? ''),
        domainId: props.domainId,
        message: feedbackText,
        viewport: {
          first: document.body.clientWidth,
          second: document.body.clientHeight,
        },
        browser: {
          productSub: navigator.productSub,
          vendor: navigator.vendor,
          pdfViewerEnabled: navigator.pdfViewerEnabled,
          maxTouchPoints: navigator.maxTouchPoints,
          hardwareConcurrency: navigator.hardwareConcurrency,
          cookieEnabled: navigator.cookieEnabled,
          appVersion: navigator.appVersion,
          platform: navigator.platform,
          userAgent: navigator.userAgent,
          language: navigator.language,
          onLine: navigator.onLine,
          webdriver: navigator.webdriver,
          // @ts-ignore
          deviceMemory: navigator.deviceMemory,
        },
      })
      setIsFormSend(true)
    } catch (e) {
      console.log(e)
    }
  }, [feedbackText, props.domainId, props.formId, satisfactionLevel])
  const onContinue: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (step === 1 && satisfactionLevel === null) {
        setErrors([{ field: 'satisfaction-level', message: 'Please share your rating' }])
      } else if (step === 1 && satisfactionLevel !== null) {
        setStep(2)
      } else if (step === 2) {
        onSubmit()
      }
      e.stopPropagation()
      e.preventDefault()
    },
    [step, satisfactionLevel, onSubmit]
  )
  if (isFormSend && satisfactionLevel)
    return (
      <div>
        Thank you for your feedback!{' '}
        {satisfactionLevel >= 4
          ? 'We’re glad to exceed your expectations!'
          : 'We’ll keep improving!'}
      </div>
    )

  return (
    <div>
      <form onSubmit={onSubmit} onSubmitCapture={onSubmit}>
        {step === 1 && (
          <SatisfactionLevel
            errorMessage={
              errors.find((e) => e.field === 'satisfaction-level')?.message ?? null
            }
            value={satisfactionLevel}
            onChange={setSatisfactionLevel}
          />
        )}
        {step === 2 && satisfactionLevel !== null && (
          <FeedbackInput
            errorMessage={null}
            formTheme={props.formTheme}
            satisfactionLevel={satisfactionLevel}
            onSetFeedbackText={setFeedbackText}
            feedbackText={feedbackText}
          />
        )}
        <p css={css({ textAlign: 'right', margin: 0 })}>
          <button css={buttonStyles} type={buttonType} onClick={onContinue}>
            Continue
          </button>
        </p>
      </form>
    </div>
  )
}
