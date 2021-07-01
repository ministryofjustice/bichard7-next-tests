Feature: {040} 04 MIS - User Performance Summary

			"""
			{040} 04 MIS - User Performance Summary
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying a specific Operational Report providing a live summary allowing a manager to prioritise resources on those Triggers that are approaching "overdue" status, and shows which are actually overdue (i.e.
			failed to have been actioned within 24h of receipt)

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/040" in the PNC
		When message id "q-solution/040" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
