Feature: R3_BR7_SI_001 (PUF = Exclusion)

			"""
			R3_BR7_SI_001 (PUF = Exclusion)
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Portal View Filter and "Special Inclusion Filter" behaviour.
			The "PNC Update Filter" has the potential to display exceptions that would never be updated against the PNC (because the PNC Update Filter prevents PNC update) as well as Triggers.
			The presence of a "Special (or "Magic") Inclusion Filter" ("onlyPNC") limits the exceptions displayed to those that will be updated on the PNC and will also limit those Triggers that can be seen.
			This Test verifies behaviour of this Filter where the Portal Update Filter is set to "Exclusion".

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/R3_BR7_SI_001" in the PNC
		When message id "q-solution/R3_BR7_SI_001" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
