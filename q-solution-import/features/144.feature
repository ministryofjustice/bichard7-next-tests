Feature: {144} BR7 R5.2-RCD491-TRPR0008 BA76005 Not Guilty

			"""
			{144} BR7 R5.2-RCD491-TRPR0008 BA76005 Not Guilty
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Breach of Bail handling where the Verdict from Court is Not Guilty.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			An Exception and Pre Update Triggers are created - however, the Breach of Bail Trigger is not created.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 144" in the PNC
		When message id "q-solution/144" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

