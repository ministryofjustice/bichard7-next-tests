import generateMessage from "./generateMessage"
import type { ResultClass } from "../types/ResultClass"
import type MessageType from "../types/MessageType"

type PncDisposal = {
  type: number
}

type PncAdjudication = {}

type Result = {
  cjsResultCode?: number
  resultVariableText?: string
  pncDisposalType?: number
  resultClass?: ResultClass
  pncAdjudicationExists?: boolean
}

type Offence = {
  recordableOnPncIndicator?: boolean
  addedByTheCourt?: boolean
  results?: Result[]
  courtCaseReferenceNumber?: true
}

export type GeneratePhase2MessageOptions = {
  messageType: MessageType
  recordableOnPncIndicator?: boolean
  arrestSummonsNumber?: string
  offences?: Offence[]
  pncAdjudication?: PncAdjudication
  pncDisposals?: PncDisposal[]
}

const generatePhase2Message = (options: GeneratePhase2MessageOptions) =>
  generateMessage("test-data/Phase2Message.xml.njk", options)

export default generatePhase2Message
