Feature: {318} BR7 R5.11-RCD673 -  No PNC update for 3052 result_Adjournment Pre Judgement

			"""
			{318} BR7 R5.11-RCD673 -  No PNC update for 3052 result_Adjournment Pre Judgement
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the change made for No update of PNC for 3052 result when present with an adjournment pre judgement result.
			Result is still displayed on the Portal and trigger TRPR0004 produced.
			HO100305 Produced.
			PNC NOT updated

			MadeTech Definition:
			<add concise test definition here>
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
