Feature: {251} BR7 R3.2-UAT-Wrong Offence or Court Code

			"""
			{251} BR7 R3.2-UAT-Wrong Offence or Court Code
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Exception generation, Trigger generation and invalid data handling:
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			An Exception and Trigger are created.
			The Exception highlights the fact that invalid data (Offence Code and Court Hearing Location values) has been sent from Court.
			Since the Portal permits only a limited set of updatable fields (and the invalid values received from Court cannot be updated) the resolution to the Exception must be one that is manually/directly updated on the PNC.
			The Exception records and Trigger record are all Marked as Complete.

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
