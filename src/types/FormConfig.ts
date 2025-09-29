export type FormConfigTheme = {
  buttonBorderRadius: string
  buttonBackgroundColor: string
  buttonTextColor: string
  textInputBorderRadius: string
  validationErrorColor: string
  textColor: string
}
export type FormConfig = {
  id: string
  domainId: string
  attributes: {
    theme: FormConfigTheme
    darkTheme?: FormConfigTheme
    useSystemTheme: true
  }
}
