Feature: {300} BR7-R5.9-RCD401-501-Subsequent Remand-Different Dates

			"""
			{300} BR7-R5.9-RCD401-501-Subsequent Remand-Different Dates
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying 'Results already on PNC' processing where Remand Results (Adjournment Pre Judgement) are received from Magistrates Court.
			Offences with Remand results are already present on the PNC.
			The Remand results from Court match identically to those already on the PNC EXCEPT for the date.
			No General Event Log entry of 'Results already on PNC' is generated.
			The Results from Court are successfully added to the PNC.

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
