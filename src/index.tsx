// ProjectName — Copyright (C) 2025 Aleksandr Zabedovskii
// Licensed under the GNU Affero General Public License v3.0 (AGPL-3.0-or-later).
import { createRoot } from 'react-dom/client'

import { App } from './App'
import { InitiateFeedbackModuleOptions } from './types/InitiateFeedbackModuleOptions'

export const initiateFeedbackModule = (options: InitiateFeedbackModuleOptions) => {
  if (!options) {
    console.error('options must be provided. Feedback module deactivated')
    return
  }
  if (!options.formId) {
    console.error('formId must be provided. Feedback module deactivated')
    return
  }
  const root = createRoot(options.container || document)
  root.render(<App formId={options.formId} />)
}
