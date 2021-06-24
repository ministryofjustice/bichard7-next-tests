Feature: {153} BR7 R5.2.2-RCD518 - Verdict Not Guilty

			"""
			{153} BR7 R5.2.2-RCD518 - Verdict Not Guilty
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Breach Results automation (Judgement With Final Result).
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			Verification is made of the "Not Guilty" Breach updates to the PNC.
			No Pre Update Breach Trigger is generated despite the Offence meeting the criteria to generate it since the Verdict for the Offence is "Not Guilty".

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 153" in the PNC
		When message id "q-solution/153" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

