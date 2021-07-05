Feature: {288} BR7 R5.8-RCD638 - TRPR0029 - Recordable Civil Case

			"""
			{288} BR7 R5.8-RCD638 - TRPR0029 - Recordable Civil Case
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies the handling of Civil Cases by the Bichard7 solution.
			Civil Case Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			All Offences are recognised as Recordable and the Impending Prosecution on the PNC is successfully updated.
			No Civil Proceedings Trigger is generated but other Triggers are produced.

			MadeTech Definition:
			Handling a recordable civil case
			"""

	Background:
		Given the data for this test is in the PNC
		And "input-message" is received

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	@Excluded
	Scenario: Handling a recordable civil case
		Given I am logged in as a "general handler"
		And I view the list of exceptions
		And there are no exceptions raised for "CIVILCASE RECORDABLE"
		Then I see trigger "PS08 - Curfew order" in the exception list table
		And the PNC updates the record
