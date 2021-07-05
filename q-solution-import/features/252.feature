Feature: {252} BR7 R5.7-RCD612-Force Owner Court Area match-SOME Trigger Exclusions

			"""
			{252} BR7 R5.7-RCD612-Force Owner Court Area match-SOME Trigger Exclusions
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Out of Area Trigger handling:
			Court Hearing results are sent through the CJSE and onto Bichard7 detailing a Breach of Bail, Remanding the Defendant into Custody and the addition of 2x Offences in Court (1x of which the Court is not interested in).
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from the PNC and also from static data tables held within the Exchange-hosted solution.
			No "Out of Area" Trigger is raised since the Case is identified as heard in the same Area as the Police Force responsible for the Case.
			The PNC is successfully updated with the results from Court.
			The Offences Added In Court are not added to the PNC (no DISARR is created and the PNC is not interesed in 1x Offence).
			Pre Update and Post Update Triggers are also generated.

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
