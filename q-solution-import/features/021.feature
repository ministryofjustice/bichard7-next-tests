Feature: {021} R3_BR7_SC_001_Mismatch Between Offences_Adjournment with Judgement

			"""
			{021} R3_BR7_SC_001_Mismatch Between Offences_Adjournment with Judgement
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Matching and Exception generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is NOT generated as the solution recognises a mismatch between those Offences received from Court and those on the PNC - in this case not all Offences received from Court match those held against the Impending Prosecution Record on the PNC.
			An Exception is also successfully created.

			MadeTech Definition:
			<add concise test definition here>
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Must
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
