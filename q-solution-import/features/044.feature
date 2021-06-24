Feature: {044} #151 - FTA Undated Warrant

			"""
			{044} #151 - FTA Undated Warrant
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Adjournment Pre Judgement), FTA Result handling and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7 for an FTA Result WITHOUT Next Hearing information.
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
		And there is a valid record for "q-solution test 044" in the PNC
		When message id "q-solution/044" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

