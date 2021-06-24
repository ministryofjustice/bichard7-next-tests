Feature: {043} #151 - FTA Dated Warrant

			"""
			{043} #151 - FTA Dated Warrant
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Adjournment Pre Judgement), Result Code Transformation, FTA Result handling and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7 for an FTA Result WITH Next Hearing information.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			CJS Result Code “4575” is transformed to a “2059” PNC Disposal in order for PNC to accept the update from Magistrates Court.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			Pre Update Triggers are also successfully created on the Portal and manually resolved.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 043" in the PNC
		When message id "q-solution/043" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

