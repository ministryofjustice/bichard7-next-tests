Feature: {313} BR7-R5.10-RCD667-Revise display of report content where multiple items are present in a single cell

			"""
			{313} BR7-R5.10-RCD667-Revise display of report content where multiple items are present in a single cell
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying improvments to the display of report content where multiple items are present in a single cell namley that there is a blank space/line between mutiple items in the same cell

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
