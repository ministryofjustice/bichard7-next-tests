Feature: {212} BR7 R5.4-RCD538-Tagging-BA Qualifier on some Offences

			"""
			{212} BR7 R5.4-RCD538-Tagging-BA Qualifier on some Offences
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Judgement With Final Result), Electronic Tagging, Curfew Requirement and Suspended Sentence handling and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7 containing Judgement With Final Result information.
			The solution recognises that:
			- Some Result Code Qualifiers received are of interest to the PNC and some are not and therefore that some Qualifiers need to be stripped out before any PNC Update is attempted
			- The Result Text received from Court includes "to be electronically monitored" and therefore that the PNC Update must include this vital information
			- "Electronic Tagging" has been assigned to the Suspended Sentence Results and not to the Curfew Order imposed and therefore that "Electonic Tagging" must be added instead to the Curfew Order
			- Only the Duration value of the Curfew Requirement should be added to the PNC
			The solution ensures in all cases that the appropriate corrections are applied before the PNC Update is created.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			PNC is verified to ensure Electronic Tagging details have been added correctly.
			Post Update Triggers are also successfully created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 212" in the PNC
		When message id "q-solution/212" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

