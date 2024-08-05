import type BichardPhase1ResultType from "../types/BichardPhase1ResultType"
import type { ResultedCaseMessageParsedXml } from "../types/IncomingMessage"
import processMessageBichard from "./processMessageBichard"
import processMessageCore from "./processMessageCore"
import Phase from "../types/Phase"
import type BichardPhase2ResultType from "../types/BichardPhase2ResultType"

export type ProcessMessageOptions = {
  expectRecord?: boolean
  expectTriggers?: boolean
  recordable?: boolean
  pncCaseType?: string
  pncOverrides?: Partial<ResultedCaseMessageParsedXml>
  pncMessage?: string
  pncAdjudication?: boolean
  phase?: Phase
}

const processMessage = <BichardResultType>(
  messageXml: string,
  options: ProcessMessageOptions = {}
): Promise<BichardResultType> => {
  if (process.env.USE_BICHARD === "true") {
    return processMessageBichard<BichardResultType>(messageXml, options)
  }

  return processMessageCore<BichardResultType>(messageXml, options)
}

export const processPhase1Message = (
  messageXml: string,
  options: ProcessMessageOptions = {}
): Promise<BichardPhase1ResultType> =>
  processMessage<BichardPhase1ResultType>(messageXml, { phase: Phase.HEARING_OUTCOME, ...options })

export const processPhase2Message = (
  messageXml: string,
  options: ProcessMessageOptions = {}
): Promise<BichardPhase2ResultType> =>
  processMessage<BichardPhase2ResultType>(messageXml, { phase: Phase.PNC_UPDATE, ...options })
