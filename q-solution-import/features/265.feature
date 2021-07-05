Feature: {265} BR7-R5.7-RCD603-AINT Result-Offence Added In Court

			"""
			{265} BR7-R5.7-RCD603-AINT Result-Offence Added In Court
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying AINT results handling:
			Court Hearing Results are sent through the CJSE and onto Bichard7 containing Libra AINT results for a Recordable Offence that is already on the PNC and for an Offence that was Added In Court.
			Pre Update and Post Update Triggers are both created.
			No PNC updated is generated since the solution recognises that AINT results are of no interest to the Police.

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
