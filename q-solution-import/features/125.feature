Feature: {125} BR7 R5.1-RCD399-Force calculation-FFSS in PTIURN

			"""
			{125} BR7 R5.1-RCD399-Force calculation-FFSS in PTIURN
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Force Owner calculation is ultimately derived from the PTIURN value (the 'FFSS' element of the PTIURN).
			The Court Hearing Results received contain both valid PTIURN and valid ASN values so the Bichard7 solution uses the 'FFSS' element of the PTIURN value held on PNC to determine the Force (i.e.
			those users) that is able to view the Trigger Records that are created.
			This is then verified by logging in as Users belonging to Forces that SHOULD NOT and SHOULD be able to view the Trigger Records.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 125" in the PNC
		When message id "q-solution/125" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

