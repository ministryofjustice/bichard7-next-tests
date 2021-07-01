Feature: {146} BR7 R5.2-RCD490-TRPR0025 case reopened with original offences

			"""
			{146} BR7 R5.2-RCD490-TRPR0025 case reopened with original offences
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Case Re-Open Application handling where the Application is granted.
			Court Hearing results are sent through the CJSE and onto Bichard7 containing only Offence "MC80524" (Application to reopen case) and other Offences.
			The Application is granted.
			The solution recognises the Application acceptance and a Pre Update Trigger (TRPR0025) is created and resolved via the Portal.
			In addition an Exception is created.
			Note also that this Test provides coverage of the revised "Section 142" business process).

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/146" in the PNC
		When message id "q-solution/146" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
