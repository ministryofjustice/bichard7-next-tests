Feature: {237} BR7 R5.6-RCD597-Single CCR-Offences Adj Pre Judg-Judg With Final Result-Offence Added In Court

			"""
			{237} BR7 R5.6-RCD597-Single CCR-Offences Adj Pre Judg-Judg With Final Result-Offence Added In Court
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation of Offence Added In Court handling where existing Offences are Adjourned (Pre Judgement & Judgement With Final Result).
			Court Hearing results are sent through the CJSE and onto Bichard7 containing Remands (Pre Judgement & Judgement With Final Result) and an Offence Added In Court that has been resulted as Judgement With Final Result.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The Court Hearing Results are successfully added automatically onto the PNC.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/237" in the PNC
		When message id "q-solution/237" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
