import BichardResultType from "../types/BichardResultType";
import { ResultedCaseMessageParsedXml } from "../types/IncomingMessage";
import processMessageBichard from "./processMessageBichard";
import processMessageCore from "./processMessageCore";

export type ProcessMessageOptions = {
  expectRecord?: boolean;
  expectTriggers?: boolean;
  recordable?: boolean;
  pncCaseType?: string;
  pncOverrides?: Partial<ResultedCaseMessageParsedXml>;
  pncMessage?: string;
  pncAdjudication?: boolean;
};

export default (messageXml: string, options: ProcessMessageOptions = {}): Promise<BichardResultType> => {
  if (process.env.USE_BICHARD === "true") {
    return processMessageBichard(messageXml, options);
  }

  return processMessageCore(messageXml, options);
};
