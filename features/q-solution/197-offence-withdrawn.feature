Feature: {197} BR7-R5.3.2-RCD556-Offence Withdrawn

			"""
			{197} BR7-R5.3.2-RCD556-Offence Withdrawn
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Result Class calculation and Withdrawn Offences processing.
			Specifically:
			Court Hearing Results are received for which all Offences are resulted as "Withdrawn".
			The Result Class for the Offence/Result is set to "Judgement With Final Result".
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC.

			MadeTech Definition:
			Verify Result Class calculation and Withdrawn Offences processing
			"""

	@Should
	@ReadyToValidate
	@NeedsRunningAgainstPNC
	Scenario: Verify Result Class calculation and Withdrawn Offences processing
		Given I am logged in as a "supervisor"
		And there is a valid record for "q-solution/197" in the PNC
		When message id "q-solution/197" is received
		Then the PNC updates the record
		And the record for "PUFIVE UPDATE" does not exist
