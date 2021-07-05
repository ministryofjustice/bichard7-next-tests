Feature: {096} R4.1.1_BR7_Libra Reconciliation Report

			"""
			{096} R4.1.1_BR7_Libra Reconciliation Report
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the Libra Reconciliation Report.
			A number of Court Hearing Results are sent and some 'missing messages' are simulated.
			The Reconciliation Report process is run and the results are checked to ensure the output matches exactly with the expected set of results.

			MadeTech Definition:
			<add concise test definition here>
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
