Feature: {294} BR7-R5.9-RCD605-Drug Driving-Minimum AlcoholLevelAmount

			"""
			{294} BR7-R5.9-RCD605-Drug Driving-Minimum AlcoholLevelAmount
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies those changes brought about as part of RCD entry #605, specifically those changes to enable the handling of Drug-Driving Offences.
			Court Hearing Results (Adjournment With Judgement) are sent through the CJSE and onto Bichard7 containing results for a Drug Driving Offence associated with a 'zero (0)' AlcoholLevelAmount and AlcoholLevelMethod value 'N' (Methamphetamine).
			A Pre Update Trigger is created.
			The PNC is successfully updated with the results from Court.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 294" in the PNC
		When message id "q-solution/294" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

