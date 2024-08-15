import generateMessage from "./generateMessage"
import type { ResultClass } from "../types/ResultClass"
import type MessageType from "../types/MessageType"

type PncDisposal = {
  type: number
}

type PncAdjudication = {}

export type Duration = {
  type: string
  unit: string
  length: number
}

type ResultQualifierVariable = {
  code: number
  duration?: Duration
}

type Result = {
  cjsResultCode?: number
  resultVariableText?: string
  pncDisposalType?: number
  resultClass?: ResultClass
  pncAdjudicationExists?: boolean
  durations?: Duration[]
  resultQualifierVariables?: ResultQualifierVariable[]
  amountSpecifiedInResults?: number[]
}

type Offence = {
  recordableOnPncIndicator?: boolean
  addedByTheCourt?: boolean
  results?: Result[]
}

export type GeneratePhase2MessageOptions = {
  messageType: MessageType
  recordableOnPncIndicator?: boolean
  arrestSummonsNumber?: string
  offences?: Offence[]
  pncId?: string
  pncAdjudication?: PncAdjudication
  pncDisposals?: PncDisposal[]
}

const generatePhase2Message = (options: GeneratePhase2MessageOptions) =>
  generateMessage("test-data/Phase2Message.xml.njk", options)

export default generatePhase2Message
