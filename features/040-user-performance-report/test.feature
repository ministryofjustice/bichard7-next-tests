Feature: {040} 04 MIS - User Performance Summary

			"""
			{040} 04 MIS - User Performance Summary
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying a specific Operational Report providing a live summary allowing a manager to prioritise resources on those Triggers that are approaching "overdue" status, and shows which are actually overdue (i.e.
			failed to have been actioned within 24h of receipt)

			MadeTech Definition:
			Generating the user performance report
			"""

	Background:
		Given the data for this test is in the PNC
			And "input-message" is received

	@Could
	@NeedsValidating
	@Excluded
	@NeedsRunningAgainstPNC
	Scenario: Generating the user performance report
		Given I am logged in as "supervisor"
			And I view the list of exceptions
			And pending
