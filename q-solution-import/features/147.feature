Feature: {147} BR7 R5.2-RCD490-TRPR0025 case reopened with MC80525 only

			"""
			{147} BR7 R5.2-RCD490-TRPR0025 case reopened with MC80525 only
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Case Re-Open Application handling where the Application is granted.
			Court Hearing results are sent through the CJSE and onto Bichard7 containing only Offence "MC80525" (Original offence reopened), making the Case Non-Recordable.
			The Application is granted and the Results from Court (incorrectly) contain the Sentencing for the Original Offence(s) against Offence "MC80525".
			The solution recognises the Application acceptance and a Pre Update Trigger (TRPR0025) is created.
			The Case itself is otherwise ignored since it contains no Recordable Offences or Results.
			Note also that this Test provides coverage of the revised "Section 142" business process).

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/147" in the PNC
		When message id "q-solution/147" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
