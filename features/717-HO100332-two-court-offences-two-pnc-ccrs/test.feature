Feature: {717} HO100332
      """
      Testing that we can resolve HO100332 exceptions and resubmit to successfully update the PNC

      In this...
      """

  Background:
    Given the data for this test is in the PNC
      And "input-message" is received

  Scenario: Resolving one pair of HO100332 exceptions
    Given I am logged in as "generalhandler"
      And I view the list of exceptions
    Then I see exception "HO100332 (2)" in the exception list table
    When I open the record for "AVALON MARTIN"
      And I click the "Offences" tab
      And I view offence "1"
      And I match the offence to PNC offence "001" in case "12/2732/000015R"
      And I return to the offence list
      And I view offence "2"
      And I match the offence to PNC offence "002" in case "12/2732/000016T"
      And I submit the record
    Then the PNC updates the record
