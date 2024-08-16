import axios from "axios"
import Phase from "../types/Phase"
import generateMockPncQueryResult from "./generateMockPncQueryResult"
import type { ProcessMessageOptions } from "./processMessage"

const processMessageCore = async <BichardResultType>(
  messageXml: string,
  {
    recordable = true,
    pncOverrides = {},
    pncCaseType = "court",
    pncMessage,
    pncAdjudication = false,
    phase = Phase.HEARING_OUTCOME,
    courtCaseReferenceOverride
  }: ProcessMessageOptions
): Promise<BichardResultType> => {
  const pncQueryResult =
    phase === Phase.HEARING_OUTCOME && recordable
      ? generateMockPncQueryResult(
          pncMessage ? pncMessage : messageXml,
          pncOverrides,
          pncCaseType,
          pncAdjudication,
          courtCaseReferenceOverride
        )
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
