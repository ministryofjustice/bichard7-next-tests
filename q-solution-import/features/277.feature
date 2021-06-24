Feature: {277} BR7-R5.8-RCD628 - Standalone Breach Admits Plea No Verdict

			"""
			{277} BR7-R5.8-RCD628 - Standalone Breach Admits Plea No Verdict
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies various Result Classes with a Plea of Admits and no Conviction Date for a Breach Case.
			Court Hearing Results for an existing Standalone Breach Offence are sent through the CJSE and onto Bichard7.
			The Remand Results from Court include a Plea of Admits and no Adjudication details.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The PNC is successfully updated with the Breach (Remand) details.
			Pre Update Triggers are also generated.
			A 2nd set of Court Hearing Results are sent through the CJSE and onto Bichard7.
			The Remand Results from Court include a Plea of Admits and no Adjudication details.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The PNC is successfully updated with the Breach (Remand) details.
			Pre Update Triggers are also generated.
			A final set of Court Hearing Results are sent through the CJSE and onto Bichard7.
			The Sentence Results from Court include a Plea of Admits and no Adjudication details.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The PNC is successfully updated with the Breach (Sentence) details.
			Pre Update Triggers are also generated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 277" in the PNC
		When message id "q-solution/277" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

