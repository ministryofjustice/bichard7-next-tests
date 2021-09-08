Feature: {313} BR7-R5.10-RCD667-Revise display of report content where multiple items are present in a single cell

			"""
			{313} BR7-R5.10-RCD667-Revise display of report content where multiple items are present in a single cell
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying improvments to the display of report content where multiple items are present in a single cell namley that there is a blank space/line between mutiple items in the same cell

			MadeTech Definition:
			Displaying report with multiple items in a cell
			"""

	Background:
		Given the data for this test is in the PNC
			And "input-message" is received

	@Could
	@Problem
	@Excluded
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: Displaying report with multiple items in a cell
		Given I am logged in as "supervisor"
			And I view the list of exceptions
