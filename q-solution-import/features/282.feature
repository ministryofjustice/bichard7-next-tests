Feature: {282} BR7 R5.8-RCD638 - TRPR0029 - Ignored Offence

			"""
			{282} BR7 R5.8-RCD638 - TRPR0029 - Ignored Offence
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies the handling of Civil Cases by the Bichard7 solution.
			Civil Case Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			All Offences are recognised as those that should be ignored (Offence Category = 'B7') and the entire Case is (purposely) ignored.
			No Civil Proceedings Trigger is generated and no Exception is raised.

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
