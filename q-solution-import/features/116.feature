Feature: {116} BR7 R5.1-238-414-Multiple CCR-Adjudications-Existing Results

			"""
			{116} BR7 R5.1-238-414-Multiple CCR-Adjudications-Existing Results
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying multiple CCR Group processing where there are no Offence 'overlaps', there are other Offences that have already been resulted with an Adjudication and Court Hearing Results received contain an Adjudication and/or Sentencing.
			Specifically, verification that certain PNC Message Type combinations can be generated and used to update the PNC where the following sets of Court Hearing Results are received:
			- 1st set of Results containing Dismissed and Adjourned Offences
			- 2nd set of Results containing Adjudications and Sentences
			- 3rd set of Results containing Dismissed and Adjourned Offences
			- 4th set of Results containing Adjudications and Sentences
			As part of this Test Pre Update Triggers are also created.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/116" in the PNC
		When message id "q-solution/116" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
