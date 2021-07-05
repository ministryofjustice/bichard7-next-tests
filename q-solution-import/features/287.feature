Feature: {287} BR7 R5.8-RCD638 - TRPR0029 - Recordable & Non-Recordable Civil Offences

			"""
			{287} BR7 R5.8-RCD638 - TRPR0029 - Recordable & Non-Recordable Civil Offences
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies the handling of Civil Cases by the Bichard7 solution.
			Court Hearing results containing Recordable and Non-Recordable Civil Offences are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			An Exception is generated as a result of the incompatible (but valid) combination of Civil (Non-Recordable) & Criminal (Recordable) Offences that have been received from Court.
			No update is therefore made to the PNC.
			Since the Civil Offence Results cannot meet the conditions for the Civil Proceedings Trigger the TRPR0029 Trigger is not generated.
			Other Pre Update Triggers are generated as part of the processing for this Case.

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
