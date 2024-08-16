import World from "../../utils/world"
import generateSpiMessage from "../helpers/generateSpiMessage"
import { processPhase1Message } from "../helpers/processMessage"
import type { ResultedCaseMessageParsedXml } from "../types/IncomingMessage"

describe.ifPhase1("HO100310", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection()
  })

  it("Two pairs of HO100310 exceptions, in two PNC court cases", async () => {
    const inputMessage = generateSpiMessage({
      offences: [
        { offenceSequenceNumber: 1, code: "CJ88144", results: [{ code: 1015 }, { code: 1115 }] },
        { offenceSequenceNumber: 1, code: "CJ88144", results: [{ code: 1015 }] }
      ]
    })

    const pncDetails = {
      Session: {
        Case: {
          Defendant: {
            Offence: [
              { sequenceNumber: 1, cjsOffenceCode: "CJ88144" },
              { sequenceNumber: 2, cjsOffenceCode: "CJ88144" }
            ]
          }
        }
      }
    } as unknown as Partial<ResultedCaseMessageParsedXml>

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false,
      pncOverrides: pncDetails
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100310",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "CriminalProsecutionReference",
          "OffenceReasonSequence"
        ]
      },
      {
        code: "HO100310",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          1,
          "CriminalProsecutionReference",
          "OffenceReasonSequence"
        ]
      }
    ])
  })

  it("Two pairs of HO100310 exceptions, in one PNC court case", async () => {
    const inputMessage = generateSpiMessage({
      offences: [
        { offenceSequenceNumber: 1, code: "CJ88144", results: [{ code: 1015 }, { code: 1115 }] },
        { offenceSequenceNumber: 1, code: "CJ88144", results: [{ code: 1015 }] }
      ]
    })

    const pncDetails = {
      Session: {
        Case: {
          Defendant: {
            Offence: [{ sequenceNumber: 1, cjsOffenceCode: "CJ88144" }]
          }
        }
      }
    } as unknown as Partial<ResultedCaseMessageParsedXml>

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false,
      pncOverrides: pncDetails
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100310",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "CriminalProsecutionReference",
          "OffenceReasonSequence"
        ]
      },
      {
        code: "HO100310",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          1,
          "CriminalProsecutionReference",
          "OffenceReasonSequence"
        ]
      }
    ])
  })

  it("3 similar court offences, 2 pnc offences - one added in court", async () => {
    const inputMessage = generateSpiMessage({
      offences: [
        { offenceSequenceNumber: 1, code: "CJ88144", results: [{ code: 1015 }] },
        { offenceSequenceNumber: 2, code: "CJ88144", results: [{ code: 1015 }] },
        { offenceSequenceNumber: 0, code: "CJ88144", results: [{ code: 1015 }, { code: 1115 }] }
      ]
    })

    const pncDetails = {
      Session: {
        Case: {
          Defendant: {
            Offence: [
              { sequenceNumber: 1, cjsOffenceCode: "CJ88144" },
              { sequenceNumber: 2, cjsOffenceCode: "CJ88144" }
            ]
          }
        }
      }
    } as unknown as Partial<ResultedCaseMessageParsedXml>

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processPhase1Message(inputMessage, {
      expectTriggers: false,
      pncOverrides: pncDetails
    })

    expect(exceptions).toStrictEqual([
      {
        code: "HO100310",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          0,
          "CriminalProsecutionReference",
          "OffenceReasonSequence"
        ]
      },
      {
        code: "HO100310",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          1,
          "CriminalProsecutionReference",
          "OffenceReasonSequence"
        ]
      },
      {
        code: "HO100310",
        path: [
          "AnnotatedHearingOutcome",
          "HearingOutcome",
          "Case",
          "HearingDefendant",
          "Offence",
          2,
          "CriminalProsecutionReference",
          "OffenceReasonSequence"
        ]
      }
    ])
  })
})
