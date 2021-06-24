Feature: {124} BR7 R5.1-RCD399-Force calculation-FFSS in ASN

			"""
			{124} BR7 R5.1-RCD399-Force calculation-FFSS in ASN
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Force Owner calculation is ultimately derived from the Arrest Summons Number value (the 'FFSS' element of the ASN).
			The Court Hearing Results received contain an invalid PTIURN value so the Bichard7 solution uses the 'FFSS' element of the ASN value to determine the Force (i.e.
			those users) that is able to view the Exception Record that is created.
			This is then verified by logging in as Users belonging to Forces that SHOULD NOT and SHOULD be able to view the Exception Record.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 124" in the PNC
		When message id "q-solution/124" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

