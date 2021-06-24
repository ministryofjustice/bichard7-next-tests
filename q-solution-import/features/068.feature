Feature: {068} R3.5_BR7_CCR Group Matching-Offence Added In Court-Offence in CCR 1

			"""
			{068} R3.5_BR7_CCR Group Matching-Offence Added In Court-Offence in CCR 1
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Multiple CCR Group handling and Exception generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is NOT generated as the solution recognises that 3x CCR Groups (a limitation with the PNC interface) are present on the PNC.
			An Exception is successfully created and Pre Update Triggers are also generated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 068" in the PNC
		When message id "q-solution/068" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

