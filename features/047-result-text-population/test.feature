Feature: {047} #186 - Result text population for Orders - 2nd variation

			"""
			{047} #186 - Result text population for Orders - 2nd variation
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Judgement with Final Result), updating the PNC with Result Text and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7 for a number of Orders Results.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results (Result Codes 1100,3041) are successfully added automatically onto the PNC which include specific updates to PNC Disposal Text.
			Pre Update Triggers are also successfully created on the Portal.

			MadeTech Definition:
			Result text population for Orders - 2nd variation
			"""

	Background:
		Given the data for this test is in the PNC
			And "input-message" is received

	@Could
	@ReadyToValidate
	@NeedsRunningAgainstPNC
	Scenario: Result text population for Orders - 2nd variation
		Given I am logged in as a "supervisor"
		When I view the list of exceptions
			And the PNC updates the record
		Then I see trigger "PR03 - Order issues" in the exception list table
			And I see trigger "PS03 - Disposal text truncated" in the exception list table
			And there are no exceptions raised for "RTTOO Update"
