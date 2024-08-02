import type BichardPhase1ResultType from "../types/BichardPhase1ResultType"
import type { ResultedCaseMessageParsedXml } from "../types/IncomingMessage"
import processMessageBichard from "./processMessageBichard"
import processMessageCore from "./processMessageCore"
import type Phase from "../types/Phase"

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

const processMessage = (messageXml: string, options: ProcessMessageOptions = {}): Promise<BichardPhase1ResultType> => {
  if (process.env.USE_BICHARD === "true") {
    return processMessageBichard(messageXml, options)
  }

  return processMessageCore(messageXml, options)
}

export default processMessage
