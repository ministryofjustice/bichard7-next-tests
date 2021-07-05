Feature: {323} BR7 R5.11-RCD687 - Existing Offence Result 2060 with Offence added in court Result 1000 and Recordable Result_PNC Updated

			"""
			{323} BR7 R5.11-RCD687 - Existing Offence Result 2060 with Offence added in court Result 1000 and Recordable Result_PNC Updated
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the existing offence with 2060 result and a offence added in court with no verdict a 1000 result and another recordable result.
			No HO200108 produced.
			TRPS0010 Triggers Raised.
			Offence added in court applied to PNC.
			2060  replaced with 2063 result on PNC update

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
