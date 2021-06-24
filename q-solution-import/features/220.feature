Feature: {220} BR7 R5.5 RCD571-1st Instance Warrant-Dated

			"""
			{220} BR7 R5.5 RCD571-1st Instance Warrant-Dated
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifying Dated 1st Instance Warrants and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7 for a 1st Instance FTA Result WITH Next Hearing information.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			Pre Update Triggers are also successfully created on the Portal and manually resolved.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 220" in the PNC
		When message id "q-solution/220" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

