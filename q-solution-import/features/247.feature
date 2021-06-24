Feature: {247} BR7 R5.6-RCD554-Existing Offence-Sentence-no PNC Adjudication

			"""
			{247} BR7 R5.6-RCD554-Existing Offence-Sentence-no PNC Adjudication
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying existing Offence behaviour and those changes to the Bichard7 solution brought about as part of RCD554.
			Court Hearing Results are received Sentencing all Offences after a Verdict has already been reached.
			However, at this point the PNC is unaware of the Verdict that has been reached and therefore holds no Adjudication for any of the Offences on the PNC.
			The Bichard7 solution recognises the mismatch of Verdicts details between the Court and the PNC and generates an "Inconsistent Result" Exception.
			No PNC update is made.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 247" in the PNC
		When message id "q-solution/247" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

