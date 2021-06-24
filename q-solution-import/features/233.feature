Feature: {233} BR7 R5.5-RCD466 - Role-based navigation Portal navigation

			"""
			{233} BR7 R5.5-RCD466 - Role-based navigation Portal navigation
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Role-based intelligent Portal navigation.
			This Test will confirm the changes to the Bichard7 solution in situations where a user has resolved everything they can on a case (exceptions and/or triggers according to their role) such that they are returned automatically to the summary list and their locks are released.
			This Test Procedure verifies the following situations:
			1: A case has 2 Triggers and an Exception outstanding:
			- An Exception Handler resolves the Exception (via resubmission) then they are returned to the Summary Page
			- A Trigger Handler who has one of the Triggers in their profile resolves it then they are returned to the Summary Page as they cannot resolve the other Trigger
			2: A case has 2 Triggers and an Exception outstanding:
			- A General Handler who has different Triggers in their profile resolves the Exception (via manual resolution) then they are returned to the Summary Page as they cannot resolve the Triggers
			- A Trigger Handler who has both of the Triggers in their profile resolves one then they remain in the Detail Page as they can resolve the other Trigger
			3: A case has 2 Triggers and an Exception outstanding:
			- A General Handler who has the Triggers in their profile resolves the Exception then they remain in the Detail Page as they can resolve the Triggers

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 233" in the PNC
		When message id "q-solution/233" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

