import { readFileSync } from "fs"
import nunjucks from "nunjucks"
import type { SpiPlea } from "../types/Plea"
import type { SpiVerdict } from "../types/Verdict"

type NextHearingDetails = {
  courtHearingLocation?: string
  dateOfHearing?: string
  timeOfHearing?: string
}

type NextHearing = {
  nextHearingDetails?: NextHearingDetails
  nextHearingReason?: string
  bailStatusOffence?: string
}

type Result = {
  code?: number
  qualifier?: string
  text?: string
  bailStatus?: string
  nextHearing?: NextHearing
  resultQualifierCode?: string
  outcome?: {
    duration?: {
      value?: number
      unit?: string
    }
    amountSterling?: number
    penaltyPoints?: number
  }
}

type AlcoholLevel = {
  amount: number
  method?: string
}

type Offence = {
  code?: string
  finding?: SpiVerdict | null
  results: Result[]
  recordable?: boolean
  plea?: SpiPlea
  startDate?: Date
  startTime?: string
  endDate?: Date
  endTime?: string
  modeOfTrial?: string
  location?: string
  offenceWording?: string
  offenceSequenceNumber?: number
  convictionDate?: string | null
  offenceDateCode?: number
  alcoholLevel?: AlcoholLevel
}

type Address = {
  addressLine1?: string
  addressLine2?: string
  addressLine3?: string
  addressLine4?: string
  addressLine5?: string
  postcode?: string
}

type Person = {
  title?: string
  familyName?: string
  givenName1?: string
  givenName2?: string
  givenName3?: string
  address?: Address
}

type Organisation = {
  name?: string
}

export type GenerateSpiMessageOptions = {
  timeOfHearing?: string
  organisation?: Organisation
  reasonForBailConditionsOrCustody?: string
  offences: Offence[]
  PTIURN?: string
  courtHearingLocation?: string
  courtPncIdentifier?: string
  person?: Person
  bailConditions?: string
  bailStatus?: string
  ASN?: string
  psaCode?: number
}

const padStart = function (str: string, maxLength: number, fillString?: string): string {
  return str.padStart(maxLength, fillString)
}

const formatDate = function (date: Date): string {
  return date.toISOString().split("T")[0]
}

const generateMessage = (templateFile: string, options: Record<string, unknown>): string => {
  const template = readFileSync(templateFile, "utf-8")

  return new nunjucks.Environment()
    .addFilter("padStart", padStart)
    .addFilter("formatDate", formatDate)
    .renderString(template, options)
}

export const generateSpiMessage = (options: GenerateSpiMessageOptions) =>
  generateMessage("test-data/SpiResults.xml.njk", options)
