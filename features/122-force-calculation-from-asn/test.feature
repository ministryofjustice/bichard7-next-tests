Feature: {122} BR7 R5.1-RCD399-Force calculation-FF in ASN

			"""
			{122} BR7 R5.1-RCD399-Force calculation-FF in ASN
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Force Owner calculation is ultimately derived from the Arrest Summons Number value (the 'FF' element of the ASN).
			The Court Hearing Results received contain both invalid PTIURN and invalid ASN (unknown 'SS' segment) values so the Bichard7 solution uses the 'FF' element of the ASN value to determine the Force (i.e.
			those users) that is able to view the Exception Record that is created.
			This is then verified by logging in as Users belonging to Forces that SHOULD NOT and SHOULD be able to view the Exception Record.

			MadeTech Definition:
			Deriving the force owner from the ASN
			"""

	Background:
		Given the data for this test is in the PNC
			And "input-message" is received

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	@Excluded
	@OnlyRunsOnPNC
	Scenario: Deriving the force owner from the ASN
		When I am logged in as a "supervisor"
			And I view the list of exceptions
