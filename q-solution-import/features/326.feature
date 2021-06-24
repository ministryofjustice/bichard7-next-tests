Feature: {326} BR7 R5.11-RCD688 - Existing Offence Result_2060 and 2063 with Offence added in court Result_2059_1x 2063 on PNC Update

			"""
			{326} BR7 R5.11-RCD688 - Existing Offence Result_2060 and 2063 with Offence added in court Result_2059_1x 2063 on PNC Update
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the existing offence with 2060 and 2063 result.
			An offence is added in court with a 2059 result.
			Only1x 2063 result is produced in order to update to PNC.
			TRPRS0010 Produced

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 326" in the PNC
		When message id "q-solution/326" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

