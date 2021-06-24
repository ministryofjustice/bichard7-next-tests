Feature: {071} R3.5_BR7_Youth Committed to Crown

			"""
			{071} R3.5_BR7_Youth Committed to Crown
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Adjournment with Judgement), Youth and Adult Crown Court handling (if the Hearing.CourtHouseCode for the original hearing court is > 4000 and the legacy code we have looked up for the next court is a Crown Court we should NOT add 4000 to the next court legacy code).
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 071" in the PNC
		When message id "q-solution/071" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

