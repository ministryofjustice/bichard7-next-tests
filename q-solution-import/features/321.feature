Feature: {321} BR7 R5.11-RCD673 - PNC update for 3052 result_Judgement Final Result

			"""
			{321} BR7 R5.11-RCD673 - PNC update for 3052 result_Judgement Final Result
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the PNC Update for 3052 result when present with another judgement with final result.
			Result is still displayed on the Portal and trigger TRPR0004 produced.
			PNC updated

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
