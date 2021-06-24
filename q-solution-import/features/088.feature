Feature: {088} R4.1.1_BR7_Court Location from Text

			"""
			{088} R4.1.1_BR7_Court Location from Text
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the extraction of Next Hearing information from Result Text and Results (Adjournment Pre Judgement) automation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The solution recognises that no structured Next Hearing information is provided and successfully extracts the Next Hearing details from the Result Text in the Court Hearing Results.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 088" in the PNC
		When message id "q-solution/088" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

