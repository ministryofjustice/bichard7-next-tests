Feature: {039} 02 MIS - Live Status Detail - Exceptions Report

			"""
			{039} 02 MIS - Live Status Detail - Exceptions Report
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying a specific Operational Report providing a live summary allowing a manager to prioritise resources on those Exceptions that are approaching "overdue" status, and shows which are actually overdue (i.e.
			failed to have been resolved within 7 days of receipt).

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 039" in the PNC
		When message id "q-solution/039" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

