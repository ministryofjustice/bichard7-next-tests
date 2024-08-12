import generateMessage from "./generateMessage"
import type { ResultClass } from "../types/ResultClass"
import type MessageType from "../types/MessageType"

type Result = {
  cjsResultCode?: number
  resultVariableText?: string
  pncDisposalType?: number
  resultClass?: ResultClass
  pncAdjudicationExists?: boolean
}

type Offence = {
  recordableOnPncIndicator?: boolean
  results?: Result[]
}

export type GeneratePhase2MessageOptions = {
  messageType: MessageType
  recordableOnPncIndicator?: boolean
  arrestSummonsNumber?: string
  offences?: Offence[]
}

const generatePhase2Message = (options: GeneratePhase2MessageOptions) =>
  generateMessage("test-data/Phase2Message.xml.njk", options)

export default generatePhase2Message
