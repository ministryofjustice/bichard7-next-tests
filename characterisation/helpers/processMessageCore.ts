import axios from "axios"
import generateMockPncQueryResult from "./generateMockPncQueryResult"
import type { ProcessMessageOptions } from "./processMessage"
import Phase from "../types/Phase"

const processMessageCore = async <BichardResultType>(
  messageXml: string,
  {
    recordable = true,
    pncOverrides = {},
    pncCaseType = "court",
    pncMessage,
    pncAdjudication = false,
    phase = Phase.HEARING_OUTCOME
  }: ProcessMessageOptions
): Promise<BichardResultType> => {
  const pncQueryResult =
    phase === Phase.HEARING_OUTCOME && recordable
      ? generateMockPncQueryResult(pncMessage ? pncMessage : messageXml, pncOverrides, pncCaseType, pncAdjudication)
      : undefined
  const requestBody = {
    inputMessage: messageXml,
    pncQueryResult,
    phase
  }
  const result = await axios.post<BichardResultType>("http://localhost:6000/", requestBody, { timeout: 2000 })
  return result.data
}

export default processMessageCore
