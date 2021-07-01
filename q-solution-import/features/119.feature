Feature: {119} BR7 R5.1-238-414-Multiple CCR-No overlaps-Withdrawn Offences

			"""
			{119} BR7 R5.1-238-414-Multiple CCR-No overlaps-Withdrawn Offences
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying multiple CCR Group processing where there are no Offence 'overlaps' and there are other Offences that have already been resulted with a Final Result.
			Specifically, verification that certain PNC Message Type combinations can be generated and used to update the PNC where the following sets of Court Hearing Results are received:
			- 1st set of Results containing Dismissed and Adjourned Offences
			- 2nd set of Results containing Adjudications and Sentences
			As part of this Test Pre Update Triggers are also created.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Must
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/119" in the PNC
		When message id "q-solution/119" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
