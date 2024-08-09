import { readFileSync } from "fs"
import nunjucks from "nunjucks"

export type GenerateAhoMessageOptions = {}

const padStart = function (str: string, maxLength: number, fillString?: string): string {
  return str.padStart(maxLength, fillString)
}

const formatDate = function (date: Date): string {
  return date.toISOString().split("T")[0]
}

export const generateMessage = (templateFile: string, options: Record<string, unknown>): string => {
  const template = readFileSync(templateFile, "utf-8")

  return new nunjucks.Environment()
    .addFilter("padStart", padStart)
    .addFilter("formatDate", formatDate)
    .renderString(template, options)
}

export const generateAhoMessage = (options: GenerateAhoMessageOptions) =>
  generateMessage("test-data/AnnotatedHearingOutcome.xml.njk", options)
