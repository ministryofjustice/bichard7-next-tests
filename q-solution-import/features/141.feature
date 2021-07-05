Feature: {141} BR7 R5.2-RCD512-Qualifier LI not duplicated

			"""
			{141} BR7 R5.2-RCD512-Qualifier LI not duplicated
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Bail Condition Trigger generation and Results (Adjournment Pre Judgement) automation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The solution recognises that Bail Conditions and the ResultCodeQualifier "LI" (Bail Conditions Cancelled) are present in the Results from Court.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			Verification is made of the Bail Conditions update to the PNC.
			A Case-level Pre Update Trigger is also generated (i.e.
			the Bail Conditions Trigger is only created once irrespective of the number of matching conditions encountered).

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
