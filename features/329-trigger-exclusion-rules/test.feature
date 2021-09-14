Feature: R3_BR7_TI_001 (Trigger Exclusion-ALL) - This needs a code

			"""
			R3_BR7_TI_001 (Trigger Exclusion-ALL) - This needs a code
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Portal View Filter behaviour.
			This Test confirms that specific Triggers can/cannot be viewed based on a user's "inclusion" and "exclusion" list confiuration.

			MadeTech Definition:
			Testing trigger exclusion rules for a user
			"""

	Background:
		Given the data for this test is in the PNC
			And "input-message" is received

	@Must
	@NeedsValidating
	@Problem
	@Excluded
	@NeedsRunningAgainstPNC
	Scenario: Testing trigger exclusion rules for a user
		Given I am logged in as "generalhandler"
			And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
