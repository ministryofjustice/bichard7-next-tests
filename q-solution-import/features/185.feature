Feature: {185} BR7 R5.3-RCD496 - Multiple CCR group NG Verdict -offence added in court_Judgement Final Result

			"""
			{185} BR7 R5.3-RCD496 - Multiple CCR group NG Verdict -offence added in court_Judgement Final Result
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying multiple CCR Group Results automation where Offences are Added In Court and 1 CCR Group has no Adjudication.
			Specifically:
			The following Results are received from Court for an Impending Prosecution Record comprising 3 CCR Groups
			- Message 1: All Offences for CCR Groups 1 & 2 = Judgment With Final Result, All Offences for CCR Group 3 = Adjournment Pre Judgement
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC.
			- Message 2: All Offences for CCR Group 3 = Adjournment With Judgement & Offence also Added In Court (Judgement With Final Result)
			Offences Added In Court can only be added to a CCR Group without an Adjudication and at the point that Adjudication is received for the Offence itself.
			Since this is the case (i.e.
			the 1x remaining CCR Group has no Offences with an Adjudication at the point the Results from Court are received) the Offence Added In Court can be added to the PNC.
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC (including the Offence Added In Court).
			Pre and Post Update Triggers are also created on the Portal.

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
