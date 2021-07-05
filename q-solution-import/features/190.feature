Feature: {190} R4.0_BR7_CC_TR_Offence Code Qualifiers

			"""
			{190} R4.0_BR7_CC_TR_Offence Code Qualifiers
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Matching where Offence Code 'Qualifiers' (i.e.
			ABCI variants) are received from Court.
			Specifically:
			- Message 1: Initial Court Results include an invalid ASN.
			An Exception created on the Portal which is corrected, resubmitted and matched with an existing Impending Prosecution Record on the PNC.
			The Offence from Court includes an Offence Qualifier (in this case "TH68011C") and this is not matched with the details of the Defendant on the PNC.
			An Exception is created to identify manual resolution as required.
			- Message 2: Initial Court Results include an invalid ASN.
			An Exception created on the Portal which is corrected, resubmitted and matched with an existing Impending Prosecution Record on the PNC.
			The Offence from Court includes an Offence Qualifier (in this case "TH68011A") and this is not matched with the details of the Defendant on the PNC.
			An Exception is created to identify manual resolution as required.

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
