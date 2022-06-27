import axios from "axios";
import BichardResultType from "../types/BichardResultType";
import generateMockPncQueryResult from "./generateMockPncQueryResult";
import { ProcessMessageOptions } from "./processMessage";

const processMessageCore = async (
  messageXml: string,
  {
    recordable = true,
    pncOverrides = {},
    pncCaseType = "court",
    pncMessage,
    pncAdjudication = false
  }: ProcessMessageOptions
): Promise<BichardResultType> => {
  const pncQueryResult = recordable
    ? generateMockPncQueryResult(pncMessage ? pncMessage : messageXml, pncOverrides, pncCaseType, pncAdjudication)
    : undefined;
  const query = {
    inputMessage: messageXml,
    pncQueryResult
  };
  const result = await axios.post<BichardResultType>("http://localhost:6000/", query);
  return result.data;
};

export default processMessageCore;
