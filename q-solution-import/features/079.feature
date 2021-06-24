Feature: {079} R4.0.6_BR7_BA qualifier applied to curfew order result

			"""
			{079} R4.0.6_BR7_BA qualifier applied to curfew order result
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Electronic Tagging (catering for an error in the way that Electronic Tagging results are received from Libra whereby the Electronic Tagging Qualifier is specified against the Result for an Order and not against the Result which specifies a Requirement), Suspended Sentence and Curfew Order Results handling, Results automation and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The solution ensures that Disposal Date values for specific Result Codes (3105) are stripped out of the update to the PNC.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			PNC is verified to ensure Electronic Tagging details have been added correctly; in this case the Electronic Tagging will have been removed from the Result for the Order (1115) and added instead to the Result which specifies the Requirement (3105).
			Post Update Triggers are also generated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 079" in the PNC
		When message id "q-solution/079" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

