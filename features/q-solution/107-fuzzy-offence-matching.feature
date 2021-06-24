Feature: {107} BR7 R5.0-RCD352-Fuzzy Offence Matching

      """
      {107} BR7 R5.0-RCD352-Fuzzy Offence Matching
      ===============
      Q-Solution Definition:
      A Bichard7 Regression Test verifying 'fuzzy' Offence matching, Results automation (Judgement with Final Result) and Trigger generation.
      Court Hearing results are sent through the CJSE and onto Bichard7.
      Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
      'Fuzzy' Offence date matching ensures that the Start and End dates for each Offence is considered a match if the date range defined by the start and end dates of the Hearing Outcome offence fall wholly within the date range defined by the start and end dates of the PNC offence.
      PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
      Pre Update Triggers are also generated.

      MadeTech Definition:
      Ensure that dates are correctly matched and that the PNC is updated correctly
      """

  @Must
  @NeedsValidating
  @NeedsRunningAgainstPNC
  Scenario: PNC is updated when there are multiple identical results
    Given there is a valid record for "q-solution test 107" in the PNC
    When message id "q-solution/107" is received
    Then the PNC updates the record

