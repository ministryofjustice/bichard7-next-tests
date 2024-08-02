import { XMLParser } from "fast-xml-parser"
import type { AnnotatedHearingOutcome, AnnotatedPncUpdateDataset, Result } from "../types/AnnotatedHearingOutcome"
import type Exception from "../types/Exception"
import type { ExceptionCode } from "../types/ExceptionCode"

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const extract = (el: any, path: (string | number)[] = []): Exception[] => {
  const exceptions = []
  for (const key in el) {
    if (key === "@_Error") {
      if (typeof el[key] === "string") {
        exceptions.push({ code: el[key] as ExceptionCode, path })
      }
    }

    if (typeof el[key] === "object") {
      const subExceptions = extract(el[key], path.concat([key.match(/\d+/) ? parseInt(key, 10) : key]))
      subExceptions.forEach((e) => exceptions.push(e))
    }
  }

  return exceptions
}

const extractExceptionsFromAho = (xml: string): Exception[] => {
  const options = {
    ignoreAttributes: false,
    removeNSPrefix: true
  }
  const parser = new XMLParser(options)
  const rawParsedObj = parser.parse(xml) as AnnotatedHearingOutcome
  const offenceElem = rawParsedObj?.AnnotatedHearingOutcome?.HearingOutcome?.Case?.HearingDefendant?.Offence
  if (offenceElem && !Array.isArray(offenceElem)) {
    rawParsedObj.AnnotatedHearingOutcome.HearingOutcome.Case.HearingDefendant.Offence = [offenceElem]
  }

  const offenceArray = rawParsedObj?.AnnotatedHearingOutcome?.HearingOutcome?.Case?.HearingDefendant?.Offence
  if (offenceArray) {
    offenceArray.forEach((offence) => {
      const results = offence.Result
      if (results && !Array.isArray(results)) {
        offence.Result = [results]
        offence.Result.forEach((result: Result) => {
          if (result.ResultQualifierVariable && !Array.isArray(result.ResultQualifierVariable)) {
            result.ResultQualifierVariable = [result.ResultQualifierVariable]
          }
        })
      }
    })
  }

  return extract(rawParsedObj)
}

export const extractExceptionsFromAnnotatedPncUpdateDataset = (xml: string): Exception[] => {
  const options = {
    ignoreAttributes: false,
    removeNSPrefix: true
  }
  const parser = new XMLParser(options)
  const rawParsedAnnotatedPud = parser.parse(xml) as AnnotatedPncUpdateDataset
  const rawParsedObj = rawParsedAnnotatedPud.AnnotatedPNCUpdateDataset.PNCUpdateDataset
  const hearingOutcome = rawParsedObj.AnnotatedHearingOutcome?.HearingOutcome
  const offenceElem = hearingOutcome.Case?.HearingDefendant?.Offence
  if (offenceElem && !Array.isArray(offenceElem)) {
    hearingOutcome.Case.HearingDefendant.Offence = [offenceElem]
  }

  const offenceArray = hearingOutcome?.Case?.HearingDefendant?.Offence
  if (offenceArray) {
    offenceArray.forEach((offence) => {
      const results = offence.Result
      if (results && !Array.isArray(results)) {
        offence.Result = [results]
        offence.Result.forEach((result: Result) => {
          if (result.ResultQualifierVariable && !Array.isArray(result.ResultQualifierVariable)) {
            result.ResultQualifierVariable = [result.ResultQualifierVariable]
          }
        })
      }
    })
  }

  return extract(rawParsedObj)
}

export default extractExceptionsFromAho
