Feature: {108} BR7 R5.0-RCD352-Offence Start Date mismatch

			"""
			{108} BR7 R5.0-RCD352-Offence Start Date mismatch
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying unambiguous 'fuzzy' Offence matching, Exception generation and resubmission via the Portal and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			'Fuzzy' Offence date matching ensures that the Start and End dates for each Offence is considered a match if the date range defined by the start and end dates of the Hearing Outcome offence fall wholly within the date range defined by the start and end dates of the PNC offence AND the PNC offence matches the HO offence and no other, and the HO offence matches the PNC and no other.
			An Exception is generated and the Court Hearing Results with portal-added values (Offence Sequence Numbers) are successfully added onto the PNC.
			Pre Update Triggers are also generated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Must
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/108" in the PNC
		When message id "q-solution/108" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
