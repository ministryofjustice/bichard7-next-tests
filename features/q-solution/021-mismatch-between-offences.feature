Feature: {021} R3_BR7_SC_001_Mismatch Between Offences_Adjournment with Judgement

      """
      {021} R3_BR7_SC_001_Mismatch Between Offences_Adjournment with Judgement
      ===============
      Q-Solution Definition:
      A Bichard7 Regression Test verifying Offence Matching and Exception generation.
      Court Hearing results are sent through the CJSE and onto Bichard7.
      Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
      PNC Update is NOT generated as the solution recognises a mismatch between those Offences received from Court and those on the PNC - in this case not all Offences received from Court match those held against the Impending Prosecution Record on the PNC.
      An Exception is also successfully created.

      MadeTech Definition:
      This tests that an exception is raised when there is a mismatch between the incoming message and the PNC data
      """

  @Must
  @Problem
  @NeedsRunningAgainstPNC
  Scenario: Exception is raised when there is a data mismatch
    Given I am logged in as a "general handler"
    And there is a valid record for "q-solution/021" in the PNC
    When message id "q-solution/021" is received
    And I view the list of exceptions
    Then I see exception "HO100304" in the exception list table
    When I open the record for "SCONEA EXCEPTION"
    # Inconsistency:
    # Test script says: 3x HO100300 - Organisation not recognised. Are also present on the portal 1 per offence
    # This is not the case
    And the PNC record has not been updated
