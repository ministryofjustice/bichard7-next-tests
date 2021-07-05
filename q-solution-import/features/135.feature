Feature: {135} BR7 R5.1.3-RCD462 - No Court-End-Date Court-Start-Date within PNC Date Range

			"""
			{135} BR7 R5.1.3-RCD462 - No Court-End-Date Court-Start-Date within PNC Date Range
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Code Matching where PNC or Court Start Date and End Dates Are equal where Court specifies an Offence Start Date only and the Court Date falls within the PNC Date range.
			Specifically:
			- Offence 1 is associated to an OffenceDateCode value of '1' and has no Court Offence End Date.
			However, Court Offence Start Date falls entirely within the PNC Offence Date range and is therefore considered a match
			- Offence 2 is associated to an OffenceDateCode value of '5' and has no Court Offence End Date.
			However, Court Offence Start Date falls entirely within the PNC Offence Date range (in this particular instance it matches the PNC Offence Start Date) and is therefore considered a match
			- Offence 3 is associated to an OffenceDateCode value of '1' and has no Court Offence End Date.
			However, Court Offence Start Date falls entirely within the PNC Offence Date range (in this particular instance it matches the PNC Offence End Date) and is therefore considered a match
			Successful update to the PNC is made.
			Since all Offences may require manual update on the PNC Pre Update Triggers (TRPR0018) are generated.

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
