Feature: {232} BR7 R5.5-RCD544-Non-Recordable-Personal Details Change and other Pre Update Triggers

			"""
			{232} BR7 R5.5-RCD544-Non-Recordable-Personal Details Change and other Pre Update Triggers
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the 'Personal Details changes' Trigger where other Pre Update Triggers are to be generated and the Case is considered to be Non-Recordable.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The Case contains no Recordable Offences and there is no matching Impending Prosecution Record on the PNC.
			The Case is (purposely) ignored by the solution but the Personal Details changes Trigger is generated alongside other Pre Update Triggers.

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
