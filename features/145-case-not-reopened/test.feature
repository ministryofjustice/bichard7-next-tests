Feature: {145} BR7 R5.2-RCD490-TRPR0025 case not reopened

			"""
			{145} BR7 R5.2-RCD490-TRPR0025 case not reopened
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Case Re-Open Application handling where the Application is refused.
			Court Hearing results are sent through the CJSE and onto Bichard7 containing only Offence "MC80524" (Application to reopen case), making the Case Non-Recordable.
			The Application is refused.
			The solution recognises the Application refusal and no Pre Update Trigger (TRPR0025) is created.
			In addition the Case itself is ignored since it contains no Recordable Offences or Results.
			Note also that this Test provides coverage of the revised "Section 142" business process).

			MadeTech Definition:
			Not creating case reopened trigger if offence is not recordable
			"""

	Background:
		Given "input-message" is received

	@Could
	@Problem
	@Excluded
	@OnlyRunsOnPNC
	Scenario: Not creating case reopened trigger if offence is not recordable
		Given I am logged in as "generalhandler"
			And I view the list of exceptions
		Then I see exception "HO100301" in the exception list table
			And I cannot see trigger "PR25 - Case reopened/stat dec" in the exception list table
