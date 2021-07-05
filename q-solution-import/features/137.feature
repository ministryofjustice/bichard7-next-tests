Feature: {137} BR7 R5.2-RCD441-Qualifier LG

			"""
			{137} BR7 R5.2-RCD441-Qualifier LG
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Domestic Violence Trigger Record generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC.
			An Offence is also Added In Court and included in the update to the PNC
			A Pre Update Trigger is created identifying the results from Court as a Domestic Violence case.
			Post Update Triggers are also created.

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
