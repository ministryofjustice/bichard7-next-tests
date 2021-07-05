Feature: {271} BR7-R5.8-RCD502-503 - Remove extraneous ASN-MCR Exceptions

			"""
			{271} BR7-R5.8-RCD502-503 - Remove extraneous ASN-MCR Exceptions
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Exception generation.
			Court Hearing Results are sent through the CJSE and onto Bichard7 containing an invalid PTIURN and a structurally invalid ASN.
			The following Exceptions are not generated:
			- Invalid MCR (Magistrates Court Reference) Exception is not produced
			- Invalid Year, SequenceNumber and CheckDigit) Exceptions are not produced
			HO100206 (Bad ASN) and HO100201 (Bad PTIURN) are still produced.
			No PNC updated is generated and no Triggers are produced.

			MadeTech Definition:
			<add concise test definition here>
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
