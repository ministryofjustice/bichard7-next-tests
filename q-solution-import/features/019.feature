Feature: {019} R3_BR7_PU_005_Identical Results Update

			"""
			{019} R3_BR7_PU_005_Identical Results Update
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Judgement with Final Result), identical results handling and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Each Offence is identical as are the results for each one.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Must
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/019" in the PNC
		When message id "q-solution/019" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
