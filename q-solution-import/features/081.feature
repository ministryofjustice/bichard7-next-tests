Feature: {081} R4.1-BR7_Bail Conditions Pre Trigger

			"""
			{081} R4.1-BR7_Bail Conditions Pre Trigger
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Exception and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is NOT generated as the solution identifies an invalid Organisation Unit code in the Results from Court.
			An Exception is generated to highlight this on the Portal and Pre Update Triggers are also successfully created.

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
