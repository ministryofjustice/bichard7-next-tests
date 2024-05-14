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
    When I go to the Case Details for this exception "HO100322"
      And I click the "Offences" tab
      And I view offence with text "Theft - other - including theft by finding"
      And I correct "Next Hearing location" to "B01EF01"
      And I correct "Next Hearing date" to "08/10/2011"
    Then I submit the record on the case details page
      And I click the "Offences" tab
      And I view offence with text "Theft - other - including theft by finding"
    Then I see the Correction badge

  @NextUI
  @ExcludeOnLegacyUI
  Scenario: No next hearing date testing the calendar component
    Given I am logged in as "supervisor"
      And I view the list of exceptions
    Then I see exception "HO100322" in the exception list table
    When I go to the Case Details for this exception "HO100322"
      And I click the "Offences" tab
      And I view offence with text "Theft - other - including theft by finding"
      And I correct "Next Hearing location" to "B01EF01"
      And I correct "Next Hearing date" and press "Space"
      And I correct "Next Hearing date" and press "ArrowDown"
      And I correct "Next Hearing date" and press "Enter"
    Then I submit the record on the case details page
      And I click the "Offences" tab
      And I view offence with text "Theft - other - including theft by finding"
    Then I see the Correction badge

  @NextUI
  @ExcludeOnLegacyUI
  Scenario: Save next hearing date
    Given I am logged in as "supervisor"
      And I view the list of exceptions
    Then I see exception "HO100322" in the exception list table
    When I go to the Case Details for this exception "HO100322"
      And I click the "Offences" tab
      And I view offence with text "Theft - other - including theft by finding"
      And I correct "Next Hearing date" to "08/10/2011" and save

# @NextUI
# @ExcludeOnLegacyUI
# Scenario: Persist saved next hearing date
#   Given I am logged in as "supervisor"
#     And I view the list of exceptions
#   Then I see exception "HO100322" in the exception list table
#   When I go to the Case Details for this exception "HO100322"
#     And I click the "Offences" tab
#     And I view offence with text "Theft - other - including theft by finding"
#     And I correct "Next Hearing date" to "08/10/2011" and save
#   Then I reload the page
#     And I click the "Offences" tab
#     And I view offence with text "Theft - other - including theft by finding"
#     And I see the correction for "Next Hearing date" to "2011-10-08"

# @NextUI
# @ExcludeOnLegacyUI
# Scenario: Update saved next hearing date
#   Given I am logged in as "supervisor"
#     And I view the list of exceptions
#   Then I see exception "HO100322" in the exception list table
#   When I go to the Case Details for this exception "HO100322"
#     And I click the "Offences" tab
#     And I view offence with text "Theft - other - including theft by finding"
#     And I correct "Next Hearing date" to "08/10/2011" and save
#   Then I reload the page
#     And I click the "Offences" tab
#     And I view offence with text "Theft - other - including theft by finding"
#     And I correct "Next Hearing date" to "10/01/2012" and save
#   Then I reload the page
#     And I click the "Offences" tab
#     And I view offence with text "Theft - other - including theft by finding"
#     And I see the correction for "Next Hearing date" to "2012-01-10"
