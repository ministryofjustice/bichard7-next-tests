Feature: {154} BR7 R5.2.2-RCD518 - New Offence - Guilty - 1040 Result

			"""
			{154} BR7 R5.2.2-RCD518 - New Offence - Guilty - 1040 Result
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Breach Results handling (Judgement With Final Result).
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			An Exception is generated since the ASN is not matched on the PNC.
			No Pre Update Breach Trigger is generated despite the Offence and the Verdict meeting the criteria to generate it since the Result received from Court is "1040" (Order To Continue).

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
