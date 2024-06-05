Feature: {716} HO100310 - two pairs of HO100310s across two court cases

      """
      Testing that we can resolve HO100310 exceptions and resubmit to successfully update the PNC

      In this case we have two sets of two offences from the court that raise HO100310 exceptions and need manually
      matching to two sets of two PNC offences, each in separate PNC court cases
      """

  Background:
    Given the data for this test is in the PNC
      And "input-message" is received

  @NextUI
  Scenario: Resolving two pairs of HO100310 exceptions across two PNC court cases
    Given I am logged in as "generalhandler"
      And I view the list of exceptions
    Then I see exception "HO100310 (4)" in the exception list table
    When I open the record for "Bass Barry"
      And I click the "Offences" tab
      And I view offence "1"
      And I match the offence to PNC offence "1"
      And I return to the offence list
      And I view offence "2"
      And I match the offence to PNC offence "2"
      And I return to the offence list
      And I view offence "3"
      And I match the offence to PNC offence "1"
      And I return to the offence list
      And I view offence "4"
      And I match the offence to PNC offence "2"
      And I submit the record
    Then the PNC updates the record
