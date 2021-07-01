Feature: R3_BR7_TI_001 (Trigger Exclusion-ALL) - This needs a code

			"""
			R3_BR7_TI_001 (Trigger Exclusion-ALL) - This needs a code
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Portal View Filter behaviour.
			This Test confirms that specific Triggers can/cannot be viewed based on a user's "inclusion" and "exclusion" list confiuration.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Must
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/R3_BR7_TI_001" in the PNC
		When message id "q-solution/R3_BR7_TI_001" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
