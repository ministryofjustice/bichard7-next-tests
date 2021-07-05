Feature: {301} BR7-R5.9-RCD644-Case Reallocation-Force Owner Court Area match-RCC Segment Verification

			"""
			{301} BR7-R5.9-RCD644-Case Reallocation-Force Owner Court Area match-RCC Segment Verification
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies those changes brought about as part of RCD entry #644.
			An Exception is created, displayed and resolved on the Portal via data update (Arrest Summons Number and Force Owner) and Record Resubmission.
			The Case is Reallocated to the New Force as part of the Resubmission.
			No "Out of Area" Trigger is produced since the Case is identified as heard in the same area as the New Police Force responsible for the Case.
			No "Trigger Case Reallocated" Trigger is raised.
			This is because a Post Update Trigger has been generated to indicate an Offence Added In Court.
			The RCC (Refer to Court Case) segment is verified as a final step in this Test to ensure its accurate construction following the manual setting of the Force Owner.

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
