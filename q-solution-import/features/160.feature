Feature: {160} BR7 R5.3-RCD482 - Offence added in court - No HO200124

			"""
			{160} BR7 R5.3-RCD482 - Offence added in court - No HO200124
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Results automation,  Trigger generation and Offences Added In Court handling.
			Specifically:
			- Message 1: Offence 1 = Judgement With Final Result (DISARR), Offence 2 = Adjournment Pre Judgement (NEWREM)
			PNC Updates are generated and the Court Hearing Results are successfully added automatically onto the PNC.
			Pre Update Triggers are also created.
			- Message 2: Offence 2 = Adjournment Pre Judgement (NEWREM), Offence 3 (Added In Court) = Judgement With Final Result (DISARR)
			The solution recognises the extra Offence as Added In Court and since there are now 2 x CCR Groups for the Defendant on the PNC the new Offence can be added.
			The 2nd (existing) and 3rd (Added) Offences are successfully updated on the PNC and Pre and Post Update Triggers are also created.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 160" in the PNC
		When message id "q-solution/160" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

