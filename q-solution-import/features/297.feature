Feature: {297} BR7-R5.9-RCD545-Duplicate Offences-DIFFERENT Result Text ISNT used as PNC Disposal Text

			"""
			{297} BR7-R5.9-RCD545-Duplicate Offences-DIFFERENT Result Text ISNT used as PNC Disposal Text
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offence Matching and Result Text/PNC Disposal Text handling.
			Court Hearing Results are received from Magistrates Court where:
			- Identical Offences are present
			- The Results include Result Text that ISNT used to generate PNC Disposal Text
			- The Result Text for each Identical Offence is DIFFERENT
			Whilst the Results from Court are technically different the Bichard7 solution determines that the updates will essentially be the same, i.e.
			the differences in Result Text are immaterial since they will not form part of the update to the PNC.
			Therefore NO Exception is generated and instead the Results from Court are successfully and automatically added to the PNC.
			No PRE and POST Update Triggers are created on the Portal either.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 297" in the PNC
		When message id "q-solution/297" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

