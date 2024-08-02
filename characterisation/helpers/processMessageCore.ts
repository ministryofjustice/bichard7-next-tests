import axios from "axios"
import type BichardPhase1ResultType from "../types/BichardPhase1ResultType"
import generateMockPncQueryResult from "./generateMockPncQueryResult"
import type { ProcessMessageOptions } from "./processMessage"
import Phase from "../types/Phase"

const processMessageCore = async (
  messageXml: string,
  {
    recordable = true,
    pncOverrides = {},
    pncCaseType = "court",
    pncMessage,
    pncAdjudication = false,
    phase = Phase.HEARING_OUTCOME
  }: ProcessMessageOptions
): Promise<BichardPhase1ResultType> => {
  const pncQueryResult =
    phase === Phase.HEARING_OUTCOME && recordable
      ? generateMockPncQueryResult(pncMessage ? pncMessage : messageXml, pncOverrides, pncCaseType, pncAdjudication)
      : undefined
  const requestBody = {
    inputMessage: messageXml,
    pncQueryResult,
    phase
  }
  const result = await axios.post<BichardPhase1ResultType>("http://localhost:6000/", requestBody)
  return result.data
}

export default processMessageCore
