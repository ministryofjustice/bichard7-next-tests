Feature: {035} R3.3_BR7_Remove HO Exception for No Results

			"""
			{035} R3.3_BR7_Remove HO Exception for No Results
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court output where no Court Results are received for an Offence.
			PPA Court Hearing Result is sent through the CJSE and onto Bichard7 containing a dummy ASN, an Offence with Offence Category 'B7' and no results.
			The solution ignores the results (since PNC has no interest) and logs the message to the General Event Log.

			MadeTech Definition:
			This tests that Bichard does not send request to PNC when Offence Category is 'B7' and ASN is dummy
			"""

	Background:
		Given the data for this test is in the PNC
			And "input-message" is received

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	@Excluded
	Scenario: No exceptions and triggers are created, nor is PNC called
		Given I am logged in as a "general handler"
			And I view the list of exceptions
		Then there are no exceptions raised for "PETARD HOIST"
			And there are no triggers raised for "PETARD HOIST"
			And the PNC record has not been updated
			# And the audit log contains...
			And pending
