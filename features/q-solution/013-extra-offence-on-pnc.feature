Feature: {013} R3_BR7_EX_001_Extra Offence on PNC

      """
      {013} R3_BR7_EX_001_Extra Offence on PNC
      ===============
      Q-Solution Definition:
      A Bichard7 Regression Test verifying Offence Matching and Exception generation.
      Court Hearing results are sent through the CJSE and onto Bichard7.
      Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
      PNC Update is NOT generated as the solution recognises a mismatch between those Offences received from Court and those on the PNC - in this case there is 1x more Offence on the PNC.
      An Exception is also successfully created and manually resolved via the Portal.

      MadeTech Definition:
      This tests that an exception is raised when there is a mismatch between the incoming message and the PNC data
      """

  @Must
  @NeedsValidating
  Scenario: Exceptio is raised when there is a data mismatch
    Given I am logged in as a "general handler"
    And there is a valid record for "q-solution test 013" in the PNC
    When message id "q-solution/013" is received
    And I view the list of exceptions
    And I see exception "HO100304" in the exception list table
    And the PNC record has not been updated

