Feature: {075} R4.0_BR7_Personal Details Trigger

			"""
			{075} R4.0_BR7_Personal Details Trigger
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Ignored Results handling, Exception generation and Exception resubmission via the Portal.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			Exception is created, displayed and resolved on the Portal via data update and record resubmission.
			PNC Exception Update is generated and the Court Hearing Results with portal-revised values (ASN) are successfully added onto the PNC.
			Specific Result Codes are stripped out of the update to the PNC (4592) and Pre Update Triggers are also generated.

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
