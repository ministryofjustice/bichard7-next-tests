Feature: {320} BR7 R5.11-RCD673 -  No PNC update for 3052 result_Adjournment Post Judgement

			"""
			{320} BR7 R5.11-RCD673 -  No PNC update for 3052 result_Adjournment Post Judgement
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the change made for No update of PNC for 3052 result when present with an adjournment post judgement result.
			Result is still displayed on the Portal and trigger TRPR0004 produced.
			HO200113 produced.
			PNC NOT updated

			MadeTech Definition:
			No PNC update for 3052 result (post-judgement)
			"""

	Background:
		Given the data for this test is in the PNC
			And "input-message" is received

	@Should
	@Excluded
	@OnlyRunsOnPNC
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: No PNC update for 3052 result (post-judgement)
		Given I am logged in as a "general handler"
			And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
			And pending