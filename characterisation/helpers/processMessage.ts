import type BichardResultType from "../types/BichardResultType"
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

export default (messageXml: string, options: ProcessMessageOptions = {}): Promise<BichardResultType> => {
  if (process.env.USE_BICHARD === "true") {
    return processMessageBichard(messageXml, options)
  }

  return processMessageCore(messageXml, options)
}
