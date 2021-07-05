Feature: {278} BR7-R5.8-RCD628 - Breach Plus Other Offences Admits Plea No Verdict

			"""
			{278} BR7-R5.8-RCD628 - Breach Plus Other Offences Admits Plea No Verdict
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies various Result Classes with a Plea of Admits and no Conviction Date for a Breach Case.
			Court Hearing Results for existing Offences - one of which is a Breach Offence - are sent through the CJSE and onto Bichard7.
			The Breach Remand Results from Court include a Plea of Admits and no Adjudication details.
			The other Offences are found Guilty and are also Adjourned to the same Hearing.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The PNC is successfully updated with the Remand details.
			Pre Update Triggers are also generated.
			A 2nd set of Court Hearing Results are sent through the CJSE and onto Bichard7.
			The Breach Remand Results from Court include a Plea of Admits and no Adjudication details.
			The other Offences are also Adjourned to the same Hearing.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The PNC is successfully updated with the Remand details.
			Pre Update Triggers are also generated.
			A final set of Court Hearing Results are sent through the CJSE and onto Bichard7.
			The Breach Sentence Results from Court include a Plea of Admits and no Adjudication details.
			The other Offences are also Sentenced at the same Hearing.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The PNC is successfully updated with the Sentencing details.
			Pre Update Triggers are also generated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
