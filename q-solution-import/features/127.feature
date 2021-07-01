Feature: {127} BR7 R5.1-RCD411-Date Codes 2 and 3 and 6 Offence Matching

			"""
			{127} BR7 R5.1-RCD411-Date Codes 2 and 3 and 6 Offence Matching
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Code Matching where a PNC Offence has an End Date but a matching Court Offence does not and the Court Offence has an Offence Date Code value of 2, 3 or 6'.
			Specifically:
			- Offence 1 is associated to an OffenceDateCode value of '2' and has no Court Offence End Date.
			The PNC matching Offence DOES have an associated PNC Offence End Date and this is NOT considered a match and the HO Error is generated as a result
			- Offence 2 is associated to an OffenceDateCode value of '3' and has no Court Offence End Date.
			The PNC matching Offence DOES have an associated PNC Offence End Date and this is NOT considered a match and the HO Error is generated as a result
			- Offence 3 is associated to an OffenceDateCode value of '6' and has no Court Offence End Date.
			The PNC matching Offence DOES have an associated PNC Offence End Date and this is NOT considered a match and the HO Error is generated as a result

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/127" in the PNC
		When message id "q-solution/127" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
