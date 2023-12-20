Feature: {413} Existing case resubmitted to Conductor

      """
      {413} Existing case resubmitted to Conductor
      ===============
      Cases existing as a result of processing by legacy bichard should
      be resubmittable to be processed by Conductor.
      """

  Background:
    Given the data for this test is in the PNC
      And the case is waiting for resubmission

  @Must
  Scenario: YZ Force code is used in logs
    Given I am logged in as "generalhandler"
      And I view the list of exceptions
    Then I see exception "HO100310 (2)" in the exception list table
    When I open the record for "Bass Barry"
      And I click the "Offences" tab
      And I view offence "1"
      And I correct "Sequence Number" to "1"
      And I click the "Offences" tab
      And I view offence "2"
      And I correct "Sequence Number" to "2"
      And I click the "Offences" tab
      And I submit the record
    Then the PNC updates the record
      And I see exception "(Submitted)" in the exception list table
    When I reload until I see "PS02 - Check address"
