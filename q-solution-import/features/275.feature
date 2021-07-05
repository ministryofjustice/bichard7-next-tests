Feature: {275} BR7 R5.8-RCD568 - OrganisationName-Parentheses Solidus Reverse Solidus

			"""
			{275} BR7 R5.8-RCD568 - OrganisationName-Parentheses Solidus Reverse Solidus
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies the capability of the Bichard7 solution to handle more than basic characters for Organisation Names received from Court.
			Court Hearing Results from Court for an Organisation whose name includes parentheses (i.e.
			'()'), a solidus (i.e.
			'/') and a reverse solidus (i.e.
			'\') are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The Bichard7 solution resolves all of the characters that the PNC will not accept in the "Name Convicted" field.
			No Exception is generated and the Results are used to successfully update the PNC without any conflict.

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
