Feature: {107} BR7 R5.0-RCD352-Fuzzy Offence Matching

			"""
			{107} BR7 R5.0-RCD352-Fuzzy Offence Matching
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying 'fuzzy' Offence matching, Results automation (Judgement with Final Result) and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			'Fuzzy' Offence date matching ensures that the Start and End dates for each Offence is considered a match if the date range defined by the start and end dates of the Hearing Outcome offence fall wholly within the date range defined by the start and end dates of the PNC offence.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			Pre Update Triggers are also generated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Must
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 107" in the PNC
		When message id "q-solution/107" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

