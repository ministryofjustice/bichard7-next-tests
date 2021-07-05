Feature: {188} BR7 R5.3-RCD494 - 2x Offence Date Match

			"""
			{188} BR7 R5.3-RCD494 - 2x Offence Date Match
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Matching and approximate Date Matching with multiple instances of the same result.
			Specifically:
			Where multiple Offences match on Offence and Result (2 x sets of 3 x Offences that match) and the Date Range of the Court Offence data is within the Offence Date Range on the PNC.
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC.
			Pre Update Trigggers are also created on the Portal.

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
