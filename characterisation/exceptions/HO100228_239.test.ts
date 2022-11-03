jest.setTimeout(30000);

import World from "../../steps/world";
import generateMessage from "../helpers/generateMessage";
import processMessage from "../helpers/processMessage";

describe("HO100228 and HO100239", () => {
  afterAll(async () => {
    await new World({}).db.closeConnection();
  });

  // legacy bichard throws runtime exception Caused by: uk.gov.ocjr.mtu.br7.common.xmlconverter.UnmarshalFailedException: javax.xml.bind.UnmarshalException: the value is out of the range (minInclusive specifies 0).\n - with linked exception:
  it.ifNewBichard("should not throw an exception for a valid CourtOffenceSequenceNumber", async () => {
    const inputMessage = generateMessage({
      offences: [{ results: [{ code: 4584 }], offenceSequenceNumber: 1 }]
    });

    const {
      hearingOutcome: { Exceptions: exceptions }
    } = await processMessage(inputMessage, {
      expectTriggers: false
    });

    expect(exceptions).toHaveLength(0);
  });

  it.ifNewBichard(
    "should create an exception if the CourtOffenceSequenceNumber is less than the min length",
    async () => {
      const inputMessage = generateMessage({
        offences: [{ results: [{ code: 1015 }], offenceSequenceNumber: -1 }]
      });

      const {
        hearingOutcome: { Exceptions: exceptions }
      } = await processMessage(inputMessage, {
        expectTriggers: false
      });

      expect(exceptions).toStrictEqual([
        {
          code: "HO100228",
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
          code: "HO100239",
          path: [
            "AnnotatedHearingOutcome",
            "HearingOutcome",
            "Case",
            "HearingDefendant",
            "Offence",
            0,
            "CourtOffenceSequenceNumber"
          ]
        }
      ]);
    }
  );

  it.ifNewBichard(
    "should create an exception if the CourtOffenceSequenceNumber is greater than the max length",
    async () => {
      const inputMessage = generateMessage({
        offences: [{ results: [{ code: 1015 }], offenceSequenceNumber: 1000 }]
      });

      const {
        hearingOutcome: { Exceptions: exceptions }
      } = await processMessage(inputMessage, {
        expectTriggers: false
      });

      expect(exceptions).toStrictEqual([
        {
          code: "HO100228",
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
          code: "HO100239",
          path: [
            "AnnotatedHearingOutcome",
            "HearingOutcome",
            "Case",
            "HearingDefendant",
            "Offence",
            0,
            "CourtOffenceSequenceNumber"
          ]
        }
      ]);
    }
  );
});
