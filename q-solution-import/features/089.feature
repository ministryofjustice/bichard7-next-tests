Feature: {089} R4.1.1_BR7_Court Location from Text Exception

			"""
			{089} R4.1.1_BR7_Court Location from Text Exception
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the extraction of Next Hearing information from Result Text and Exception generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The solution recognises that no structured Next Hearing information is provided and attempts to extract the Next Hearing details from the Result Text in the Court Hearing Results.
			However, the Court name is not recognised and so an Exception is created to highlight this on the Portal.
			PNC Update is NOT generated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 089" in the PNC
		When message id "q-solution/089" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

