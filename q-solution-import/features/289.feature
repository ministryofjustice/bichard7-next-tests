Feature: {289} BR7-R5.8-RCD640 - AINT Result-Bail Variation refused

			"""
			{289} BR7-R5.8-RCD640 - AINT Result-Bail Variation refused
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies AINT Result processing by the Bichard7 solution.
			Court Hearing Results are sent through the CJSE and onto Bichard7 containing 3 Offences and their corresponding Results, which are as follows:
			- Offence 1: Recordable, existing Offence with an AINT Result only
			- Offence 2: Recordable, existing Offence with a 'Free Text' (i.e.
			Result Text-only) Result
			- Offence 3: Non-Recordable, Offence Added In Court (Bail Variation Application) which is Refused
			Offences Added In Court are ignored in AINT processing.
			The AINT processing will only potentially therefore match for Offences 1 & 2 since they are the only ones that will match with corresponding results on the PNC.
			In addition to this each of the matched Offences contains '1000' Results.
			Only Offence 1 has a specific AINT Result (Offence 2 has none) but since the solution has found at least one matched Offence with an AINT Result this confirms the Case as an AINT Result and no Exception is generated.
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
