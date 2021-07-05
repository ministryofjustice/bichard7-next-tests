Feature: {030} R3.2_BR7_PA_001_Exception Editable Fields

			"""
			{030} R3.2_BR7_PA_001_Exception Editable Fields
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test that verifies Exception Record resubmission, editable fields and automation of results.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			Exception is created, displayed and resolved on the Portal via data update and record resubmission (PTIURN, ASN, PNCID, Next Hearing Location, Next Hearing Date) are successfully updated and resubmitted.
			A PRE Update Trigger is also successfully created on the Portal.
			The resubmission results in a new Exception being created, displayed and resolved on the Portal via data update and record resubmission.
			PNC Exception Update is generated and the Court Hearing Results with portal-added values (Offence Sequence Numbers and Result Text) are successfully added onto the PNC.

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
