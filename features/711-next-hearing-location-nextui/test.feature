Feature: Next Hearing location Next UI

			"""
			Next Hearing location - HO100300 in Next UI
			Also testing the Typeahead component
			"""

	Background:
		Given the data for this test is in the PNC
			And "input-message" is received

	@ExcludeOnLegacyUI
	@NextUI
	Scenario: No next hearing location
		Given I am logged in as "supervisor"
			And I view the list of exceptions
		Then I see exception "HO100300" in the exception list table
		When I open the record for "TRTWODATE TRIGGER"
			And I click the "Offences" tab
			And I view offence "Aggravated vehicle taking - ( driver did not take ) and vehicle damage of £5000 or over"
			And I correct "Next Hearing location" to "B01EF01"
		Then I submit the record
			And I see exception "(Submitted)" in the exception list table
			And I reload until I don't see "(Submitted)"

	@ExcludeOnLegacyUI
	@NextUI
	Scenario: No next hearing location testing the typeahead with a court name
		Given I am logged in as "supervisor"
			And I view the list of exceptions
		Then I see exception "HO100300" in the exception list table
		When I open the record for "TRTWODATE TRIGGER"
			And I click the "Offences" tab
			And I view offence "Aggravated vehicle taking - ( driver did not take ) and vehicle damage of £5000 or over"
			And I correct "Next Hearing location" and type "Barbican"
			And I select the first option
		Then I submit the record
			And I see exception "(Submitted)" in the exception list table
			And I reload until I don't see "(Submitted)"

	@ExcludeOnLegacyUI
	@NextUI
	Scenario: No next hearing location testing the typeahead with a court code
		Given I am logged in as "supervisor"
			And I view the list of exceptions
		Then I see exception "HO100300" in the exception list table
		When I open the record for "TRTWODATE TRIGGER"
			And I click the "Offences" tab
			And I view offence "Aggravated vehicle taking - ( driver did not take ) and vehicle damage of £5000 or over"
			And I correct "Next Hearing location" and type "C01B"
			And I select the first option
		Then I submit the record
			And I see exception "(Submitted)" in the exception list table
			And I reload until I don't see "(Submitted)"
