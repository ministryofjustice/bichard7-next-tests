Feature: {270} BR7 R5.7-RCD464-TRPR0026 Driving Disqualification Suspended

			"""
			{270} BR7 R5.7-RCD464-TRPR0026 Driving Disqualification Suspended
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the Driving Disqualification Suspended business process.
			Court Hearing Results are received detailing Driving Penalty Points and Driving Disqualification Suspension.
			The Offence is considered Non-Recordable but since it is already on the PNC the PNC is successfully updated with these Results.
			Pre Update Triggers are created to indicate the Results from Court.
			The Trigger is Marked as Complete once this has been completed.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 270" in the PNC
		When message id "q-solution/270" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

