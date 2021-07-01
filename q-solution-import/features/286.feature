Feature: {286} BR7 R5.8-RCD638 - TRPR0029 - Offence Code Trigger only

			"""
			{286} BR7 R5.8-RCD638 - TRPR0029 - Offence Code Trigger only
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies the handling of Civil Cases by the Bichard7 solution.
			Civil Case Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			All Offences are recognised as those that should generate the Civil Proceedings Trigger based on Offence Code only.
			No Exception is raised and no PNC Update is generated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/286" in the PNC
		When message id "q-solution/286" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
