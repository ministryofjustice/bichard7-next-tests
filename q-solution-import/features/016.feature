Feature: {016} R5.0 More than 100 x Offences for a single ASN

			"""
			{016} R5.0 More than 100 x Offences for a single ASN
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Matching and Exception generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is NOT generated as the solution recognises that more than 100x Offences are present.
			An Exception is also successfully created and manually resolved via the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/016" in the PNC
		When message id "q-solution/016" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
