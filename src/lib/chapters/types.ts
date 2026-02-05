export interface Chapter {
  id: string
  pathId: string
  sequence: number
  title: string
  description: string
  whatThisAchieves: string
  completionCriteria: string
  howTo: {
    intro: string
    steps: {
      title: string
      body: string
      tip?: string
    }[]
    commonMistakes?: string[]
  }
  requiredOutputs: {
    fieldName: string
    label: string
    type: 'text' | 'textarea' | 'list' | 'boolean'
    placeholder?: string
    helpText?: string
    howToFill?: {
      guidanceText: string
      exampleThought?: string
    }
  }[]
}
