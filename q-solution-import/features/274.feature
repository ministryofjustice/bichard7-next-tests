Feature: {274} BR7 R5.8-RCD568 - OrganisationName-Numeric Characters

			"""
			{274} BR7 R5.8-RCD568 - OrganisationName-Numeric Characters
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies the capability of the Bichard7 solution to handle more than basic characters for Organisation Names received from Court.
			Court Hearing Results from Court for an Organisation whose name contains numeric values are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The Bichard7 generates an Exception for a situation that can only be manually resolved.
			No PNC Update is attempted and no Triggers are generated.

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
