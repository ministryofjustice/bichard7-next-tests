Feature: 601 - ASN Update / Correction in the Next UI

			"""
			There is an exception on the incoming message which, when fixed, shows the ASN Correction
			"""

	Background:
		Given the data for this test is in the PNC
			And "input-message" is received

	@NextUI
	Scenario: Updates the ASN in Next UI and submit the exception
		Given I am logged in as "supervisor"
			And I view the list of exceptions
		Then I see exception "HO100206" in the exception list table
		When I open the record for "SEXOFFENCE TRPRFOUR"
			And I click the "Defendant" tab
			And I correct "ASN" to "1101ZD0100000448754K"
			And I see the correction for "ASN" to "1101ZD0100000448754K"
		Then I submit the record
			And I reload until I don't see "(Submitted)"
			And I see exception "(Resolved)" in the exception list table

	@NextUI
	Scenario: Updates the ASN in Next UI and reload the case details page
		Given I am logged in as "supervisor"
			And I view the list of exceptions
		Then I see exception "HO100206" in the exception list table
		When I open the record for "SEXOFFENCE TRPRFOUR"
			And I click the "Defendant" tab
			And I correct "ASN" to "1101ZD0100000448754K"
			And I see the correction for "ASN" to "1101ZD0100000448754K" and reload
		Then I submit the record
			And I reload until I don't see "(Submitted)"
			And I see exception "(Resolved)" in the exception list table
