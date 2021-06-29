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
  @ReadyToValidate
  @NeedsRunningAgainstPNC
  Scenario: Exception is raised when there is a data mismatch
    Given I am logged in as a "supervisor"
    And there is a valid record for "q-solution/013" in the PNC
    When message id "q-solution/013" is received
    And I view the list of exceptions
    And I see exception "HO100304" in the exception list table
    When I open the record for "EXONE EXCEPTION"
    And I click the "Triggers" tab
    Then I see trigger "TRPR0006"
    When I manually resolve the record
    Then the "record" for "EXONE EXCEPTION" is "Resolved"
    And the "record" for "EXONE EXCEPTION" is not "Unresolved"
    And the PNC record has not been updated

