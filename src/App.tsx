import { css } from '@emotion/react'

import { getFormConf } from './api/getFormConf'
import { useRequest } from './api/useRequest'
import { InPlaceForm } from './features/InPlaceForm/InPlaceForm'

type AppProps = {
  formId: string
}

export const App = (props: AppProps) => {
  const styles = css`
    font-family: Helvetica, serif;
  `
  const { data, loading, error } = useRequest(() => getFormConf(props.formId))
  if (!data && loading) return 'Loading...'
  if (!data || error) return error ? error.message : 'Unknown error'
  return (
    <div css={styles}>
      <InPlaceForm
        formId={props.formId}
        domainId={data.domainId}
        formTheme={data.attributes.theme}
      />
    </div>
  )
}
