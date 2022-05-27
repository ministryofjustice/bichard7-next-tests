jest.setTimeout(30000)

import { lookupOffenceByCjsCode } from "../helpers/dataLookup"
import generateMessage from "../helpers/generateMessage"
import World from "../../../../steps/world"
import processMessage from "../helpers/processMessage"

describe("HO100233", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it.ifNewBichard("should not throw an exception for a valid offence title", async () => {
    ;(lookupOffenceByCjsCode as jest.MockedFunction<typeof lookupOffenceByCjsCode>).mockReturnValue({
      cjsCode: "MC8080524",
      offenceCategory: "CB",
      offenceTitle: "Application to reopen case",
      recordableOnPnc: false,
      description: "blah",
      homeOfficeClassification: "123/45",
      notifiableToHo: true,
      resultHalfLifeHours: null
    })

    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 4584 }] }]
    })

    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    expect(exceptions).toHaveLength(0)
    expect(lookupOffenceByCjsCode).toHaveBeenCalled()
  })

  it.ifNewBichard("should create an exception if the offence title is less than the min length", async () => {
    ;(lookupOffenceByCjsCode as jest.MockedFunction<typeof lookupOffenceByCjsCode>).mockReturnValue({
      cjsCode: "MC8080524",
      offenceCategory: "CB",
      offenceTitle: "",
      recordableOnPnc: false,
      description: "blah",
      homeOfficeClassification: "123/45",
      notifiableToHo: true,
      resultHalfLifeHours: null
    })

    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 1015 }] }]
    })

    // Process the mock message
    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    // Check the right triggers are generated
    expect(exceptions).toStrictEqual([
      {
        code: "HO100233",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "Offence", 0, "OffenceTitle"]
      }
    ])
  })

  it.ifNewBichard("should create an exception if the offence title is greater than the max length", async () => {
    ;(lookupOffenceByCjsCode as jest.MockedFunction<typeof lookupOffenceByCjsCode>).mockImplementation(() => ({
      cjsCode: "MC8080524",
      offenceCategory: "CB",
      offenceTitle: "x".repeat(121),
      recordableOnPnc: false,
      description: "blah",
      homeOfficeClassification: "123/45",
      notifiableToHo: true,
      resultHalfLifeHours: null
    }))
    // Generate a mock message
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 1015 }] }]
    })

    // Process the mock message
    const { exceptions } = await processMessage(inputMessage, {
      expectTriggers: false
    })

    // Check the right triggers are generated
    expect(exceptions).toStrictEqual([
      {
        code: "HO100233",
        path: ["AnnotatedHearingOutcome", "HearingOutcome", "Case", "HearingDefendant", "Offence", 0, "OffenceTitle"]
      }
    ])
  })
})