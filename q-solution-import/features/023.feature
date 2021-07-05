Feature: {023} R3.1_BR7_GUI_001_Appearance and Behaviour

			"""
			{023} R3.1_BR7_GUI_001_Appearance and Behaviour
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Exception generation, Trigger generation and Exception resubmission via the Portal:
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			An Exception and Trigger are created.
			The Exception is resolved using the Portal via data update and record resubmission.
			A second Exception is created, displayed and resolved on the Portal via data update and record resubmission.
			PNC Update is generated and the Court Hearing Results with portal-updated values (ASN) are successfully added onto the PNC.

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
