Feature: {017} R3_BR7_NX001_Court Code 9998

			"""
			{017} R3_BR7_NX001_Court Code 9998
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Subsequent Variation (SUBVAR) Court Results automation.
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
		And there is a valid record for "q-solution/017" in the PNC
		When message id "q-solution/017" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
