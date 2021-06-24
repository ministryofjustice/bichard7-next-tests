Feature: {231} BR7-R5.5-RCD577-Bug Fix for multiple CCR Group cases where HO100320 is incorrectly raised

			"""
			{231} BR7-R5.5-RCD577-Bug Fix for multiple CCR Group cases where HO100320 is incorrectly raised
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Multi-CCR Group Breach handling and behaviour as follows:
			3x Offences are present on the PNC with No Adjudication, namely:
			- RT88333 (Drive whilst disqualified)
			- RT88191 (Use a motor vehicle without third party insurance)
			- MD71530 (Possess a controlled drug of Class B - Cannabis / Cannabis Resin)
			A 1st set of Court Hearing Results are received as follows:
			- All Offences resulted as Guilty & Remanded on Conditional Bail (Result Code '4027')
			An additional 2x Offences are added to the PNC as a separate CCR Group for the Case with No Adjudication, namely:
			- TH68007 (Theft from a motor vehicle)
			- CJ03507 (Commission of a further offence during the operational period of a suspended sentence)
			A 2nd set of Court Hearing Results are received as follows:
			- Warrant Issued
			- All Convicted Offences are Adjourned Post Judgement
			- The Offences added to the PNC are Adjourned Pre Judgement
			The Results from Court are used to successfully update the PNC (and no HO100320 Exception will be generated).

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 231" in the PNC
		When message id "q-solution/231" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

