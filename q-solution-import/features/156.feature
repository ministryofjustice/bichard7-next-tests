Feature: {156} BR7 R5.2.2-RCD518 - Offence Code Not in list

			"""
			{156} BR7 R5.2.2-RCD518 - Offence Code Not in list
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Breach Results automation (Judgement With Final Result).
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			Verification is made of the "Guilty" Breach updates to the PNC.
			Pre Update Triggers are generated however, no Breach Trigger is created since the Offence is not in the list to generate the Breach Trigger.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/156" in the PNC
		When message id "q-solution/156" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
