import axios from "axios";
import BichardResultType from "../types/BichardResultType";
import generateMockPncQueryResult from "./generateMockPncQueryResult";
import { ProcessMessageOptions } from "./processMessage";
import Phase from "../types/Phase";

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
): Promise<BichardResultType> => {
  const pncQueryResult = recordable
    ? generateMockPncQueryResult(pncMessage ? pncMessage : messageXml, pncOverrides, pncCaseType, pncAdjudication)
    : undefined;
  const requestBody = {
    inputMessage: messageXml,
    pncQueryResult,
    phase
  };
  const result = await axios.post<BichardResultType>("http://localhost:6000/", requestBody);
  return result.data;
};

export default processMessageCore;
