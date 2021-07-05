Feature: {262} BR7 R5.7-RCD602-No NEWREM Bail Conditions for Defendant on Pre Release Conditions

			"""
			{262} BR7 R5.7-RCD602-No NEWREM Bail Conditions for Defendant on Pre Release Conditions
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Remand in Custody with Pre-Release conditions handling:
			Court Hearing Results (Custody with Pre Release Conditions) are sent through the CJSE and onto Bichard7.
			The solution recognises that the Bail Status is considered to be a Custodial Remand and as a result the Court Result does not appear on the Bail Conditions Report.
			A Pre Update Trigger is created (not TRPR0010) to indicate the Defendant's Remand Status (Custody with Bail Direction).
			The PNC is successfully updated.
			No Bail Conditions are added onto the PNC.

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
