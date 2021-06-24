Feature: {281} BR7 R5.8-RCD638 - TRPR0029 - Identical Civil Offences

			"""
			{281} BR7 R5.8-RCD638 - TRPR0029 - Identical Civil Offences
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies the handling of Civil Cases by the Bichard7 solution.
			Civil Case Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The Offences are recognised as 2x identical Civil Offences that should  generate the Civil Proceedings Trigger based on Offence Code and "Granted" Result Text combination.
			A single Civil Proceedings Trigger is generated since the Trigger is a Case-level Trigger.
			No Exception is raised and no PNC Update is generated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 281" in the PNC
		When message id "q-solution/281" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

