Feature: {325} BR7 R5.11-RCD688 - Existing Offence Result_2060 and Existing Recordable Offence with Offence added in court Result_2059 PNC updated with 2060

			"""
		{325} BR7 R5.11-RCD688 - Existing Offence Result_2060 and Existing Recordable Offence with Offence added in court Result_2059 PNC updated with 2060
		===============
		Q-Solution Definition:
		A Bichard7 Regression Test verifying the existing offence with 2060 result and another existing recordable offence.
		An offence added in court with a 2059 result.
		Then do NOT replace 2060 with 2063 result when updating the PNC.
			TRPRS0010 Produced

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/325" in the PNC
		When message id "q-solution/325" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
