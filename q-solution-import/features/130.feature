Feature: {130} BR7 R5.1-RCD411-Offence Matching-Start-End-Dates Match

			"""
			{130} BR7 R5.1-RCD411-Offence Matching-Start-End-Dates Match
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Code Matching where all Court Offence Start/End Dates and PNC Offence Start/End Dates match.
			The Bichard7 solution cannot immediately automate the Results from Court since multiple Court Offences with different results match a PNC Offence and therefore an Exception is created.
			Offence Sequence Number values are manually assigned (leaving the Offence Sequence Number for an Offence Added In Court BLANK), the record resubmitted from the Portal and a successful update to the PNC is made.
			Post Update Triggers are also created.

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