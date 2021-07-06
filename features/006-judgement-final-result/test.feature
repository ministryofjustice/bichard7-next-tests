Feature: {006} R3_BR7_TR_003_TRPS0002

			"""
			{006} R3_BR7_TR_003_TRPS0002
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Judgement with Final Result) and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			A Post Update Trigger is also successfully created on the Portal and manually resolved.

			MadeTech Definition:
			This test will generate a trigger for PS02 - Check address and will check that we are able to resolve that trigger
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Should
	@ReadyToValidate
	@NeedsRunningAgainstPNC
	Scenario: I can resolve a trigger for check address
		Given I am logged in as a "supervisor"
		And I view the list of exceptions
		Then I see trigger "PS02 - Check address" in the exception list table
		When I open the record for "TRTHREE TRPSTWO"
		And I click the "Triggers" tab
		When I resolve all of the triggers
		Then the "record" for "TRTHREE TRPSTWO" is "resolved"
		Then the "record" for "TRTHREE TRPSTWO" is not "unresolved"
		And there are no exceptions
		Then the PNC updates the record