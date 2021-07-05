Feature: {036} 3.3_BR7_Penalty Points for Result Code 3008

			"""
			{036} 3.3_BR7_Penalty Points for Result Code 3008
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Penalty Points handling and Court Results automation.
			Court Hearing results including Penalty Points are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.

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
