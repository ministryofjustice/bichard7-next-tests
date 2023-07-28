Feature: {504} Note generation

      """
      Ensuring that the correct notes are generated by the system when triggers and exceptions are generated
      (Based on test 108)
      """

  Background:
    Given the data for this test is in the PNC
      And "input-message" is received

  Scenario: PNC is updated when there are multiple identical results
    Given I am logged in as "generalhandler"
      And I view the list of exceptions
    Then I see trigger "HO100310 (2)" in the exception list table
    When I open the record for "MISMATCH OFFENCE"
      And I click the "Notes" tab
    Then I see "Error codes: 2 x HO100310" in the table
      And I see "Trigger codes: 1 x TRPR0004" in the table
    When I click the "Offences" tab
      And I view offence "1"
      And I correct "Sequence Number" to "1"
      And I click the "Offences" tab
      And I submit the record
    Then I see exception "(Submitted)" in the exception list table
      And the PNC updates the record
    When I reload until I see "PS10 - Offence added to PNC"
      And I open the record for "MISMATCH OFFENCE"
      And I click the "Notes" tab
    Then I see "Error codes: 2 x HO100310" in the table
      And I see "Trigger codes: 1 x TRPR0004" in the table
      And I see "generalhandler: Portal Action: Resubmitted Message." in the table
      And I see "generalhandler: Portal Action: Update Applied. Element: OffenceReasonSequence. New Value: 1" in the table
      And I see "Triggers added: 1 x TRPR0018" in the table
      And I see "Triggers added: 2 x TRPS0010" in the table
