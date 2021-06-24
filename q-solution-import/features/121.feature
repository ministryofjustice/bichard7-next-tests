Feature: {121} BR7 R5.1-RCD399-Force calculation-FF code in CourtHearingLocation

			"""
			{121} BR7 R5.1-RCD399-Force calculation-FF code in CourtHearingLocation
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Force Owner calculation is ultimately derived from the Court Hearing Location value (the 'FF' element of the Court code).
			The Court Hearing Results received contain both invalid ASN and invalid PTIURN values so the Bichard7 solution uses the Court Hearing Location value to determine the Force (i.e.
			those users) that is able to view the Exception Record that is created.
			This is then verified by logging in as Users belonging to Forces that SHOULD NOT and SHOULD be able to view the Exception Record.
			The invalid ASN value is corrected, the record resubmitted from the Portal and the remaining exception is now visable to the force as defined by the corrected ASN

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 121" in the PNC
		When message id "q-solution/121" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

