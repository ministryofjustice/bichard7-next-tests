Feature: {186} BR7 R5.3-RCD494 - No Date Match

			"""
			{186} BR7 R5.3-RCD494 - No Date Match
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Matching and approximate Date Matching with multiple instances of the same result.
			Specifically:
			Where multiple Offences match on Offence and Result but the Date Range of the Court Offence data is outside of the Offence Date Range on PNC the solution will generate an Exception.

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
