Feature: Next Hearing Date Not Found Next UI

      """
      Next Hearing Date Not Found in Next UI - HO100322
      Also testing the calendar component
      """

  Background:
    Given the data for this test is in the PNC
      And "input-message" is received

  @NextUI
  @ExcludeOnLegacyUI
  Scenario: No next hearing date
    Given I am logged in as "supervisor"
      And I view the list of exceptions
    Then I see exception "HO100322" in the exception list table
    When I open the record for "Harp Nigel"
      And I click the "Offences" tab
      And I view offence "Theft - other - including theft by finding"
      And I correct "Next Hearing location" to "B01EF01"
      And I correct "Next Hearing date" to "08/10/2011"
    Then I submit the record
      And I see exception "(Submitted)" in the exception list table
      And I reload until I don't see "(Submitted)"

  @NextUI
  @ExcludeOnLegacyUI
  Scenario: No next hearing date testing the calendar component
    Given I am logged in as "supervisor"
      And I view the list of exceptions
    Then I see exception "HO100322" in the exception list table
    When I open the record for "Harp Nigel"
      And I click the "Offences" tab
      And I view offence "Theft - other - including theft by finding"
      And I correct "Next Hearing location" to "B01EF01"
      And I correct "Next Hearing date" and press "Space"
      And I correct "Next Hearing date" and press "ArrowDown"
      And I correct "Next Hearing date" and press "Enter"
    Then I submit the record
      And I see exception "(Submitted)" in the exception list table
      And I reload until I don't see "(Submitted)"
