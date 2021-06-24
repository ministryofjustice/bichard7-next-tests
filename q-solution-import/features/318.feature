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

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 318" in the PNC
		When message id "q-solution/318" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

