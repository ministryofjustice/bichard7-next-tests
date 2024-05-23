Feature: 601 - ASN Update / Correction in the Next UI

			"""
			There is an exception on the incoming message which, when fixed, shows the ASN Correction
			"""

	Background:
		Given the data for this test is in the PNC
			And "input-message" is received

	@NextUI
	@ExcludeOnLegacyUI
	Scenario: Updates the ASN in Next UI and submit the exception
		Given I am logged in as "supervisor"
			And I view the list of exceptions
		Then I see exception "HO100206" in the exception list table
		When I open the record for "SEXOFFENCE TRPRFOUR"
			And I click the "Defendant" tab
			And I correct "ASN" to "1101ZD0100000448754K" and save
			And I see the correction for "ASN" to "11/01ZD/01/00000448754K"
		Then I submit the record
			And I reload until I don't see "(Submitted)"
			And I see exception "(Resolved)" in the exception list table

	@NextUI
	@ExcludeOnLegacyUI
	Scenario: Updates the ASN in Next UI and reload the case details page
		Given I am logged in as "supervisor"
			And I view the list of exceptions
		Then I see exception "HO100206" in the exception list table
		When I open the record for "SEXOFFENCE TRPRFOUR"
			And I click the "Defendant" tab
			And I correct "ASN" to "1101ZD0100000448754K" and save
		Then I reload the page
			And I see the correction for "ASN" to "11/01ZD/01/00000448754K"
		Then I submit the record
			And I reload until I don't see "(Submitted)"
			And I see exception "(Resolved)" in the exception list table

	@NextUI
	@ExcludeOnLegacyUI
	Scenario: Updates the ASN in Next UI and reload the case details page
		Given I am logged in as "supervisor"
			And I view the list of exceptions
		Then I see exception "HO100206" in the exception list table
		When I open the record for "SEXOFFENCE TRPRFOUR"
			And I click the "Defendant" tab
			And I correct "ASN" to "1101ZD0100000448754K" and save
		Then I reload the page
			And I see the correction for "ASN" to "11/01ZD/01/00000448754K"
		Then I submit the record
			And I reload until I don't see "(Submitted)"
			And I see exception "(Resolved)" in the exception list table

	@NextUI
	@ExcludeOnLegacyUI
	Scenario: Updates the ASN in Next UI and edit the saved ASN
		Given I am logged in as "supervisor"
			And I view the list of exceptions
		Then I see exception "HO100206" in the exception list table
		When I open the record for "SEXOFFENCE TRPRFOUR"
			And I click the "Defendant" tab
			And I correct "ASN" to "1101ZD0100000448754K" and save
		Then I reload the page
			And I see the correction for "ASN" to "11/01ZD/01/00000448754K"
		Then I correct "ASN" to "1101ZD0100000410836V" and save
		Then I reload the page
			And I see the correction for "ASN" to "11/01ZD/01/00000410836V"
		Then I submit the record
			And I reload until I don't see "(Submitted)"
			And I see exception "(Resolved)" in the exception list table
