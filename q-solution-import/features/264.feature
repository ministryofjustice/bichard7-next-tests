Feature: {264} BR7-R5.7-RCD603-AINT Result-Exception generation

			"""
			{264} BR7-R5.7-RCD603-AINT Result-Exception generation
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying AINT results handling:
			Court Hearing Results are sent through the CJSE and onto Bichard7 containing Libra AINT results for a Recordable Offence that is already on the PNC and for a Stop Listed Offence that was Added In Court.
			An Exception is generated.
			A Pre Update Trigger is created for the Recordable Offence only.
			The Exception (bad PNCID format) is corrected and the Exception resubmitted from the Portal.
			No PNC updated is generated since the solution recognises that AINT results are of no interest to the Police.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 264" in the PNC
		When message id "q-solution/264" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

