Feature: {049} #191 - TRPS0008 Required for curfew orders (1052) NOT TRPR0003

			"""
			{049} #191 - TRPS0008 Required for curfew orders (1052) NOT TRPR0003
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Judgement with Final Result), BA Result Code
			Qualifier handling (catering for an error in the way that Electronic Tagging results are received from Libra
			whereby the Electronic Tagging Qualifier is specified against the Result for an Order and not against the
			Result which specifies a Requirement) and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7 containing Judgement and Final Result
			information which also includes Electronic Tagging (BA Qualifier).
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried
			response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			PNC is verified to ensure Electronic Tagging details have been added correctly; in this case the Electronic
			Tagging will have been removed from the Result for the Order (1116) and added instead to the Result which specifies the Requirement (3105).
			Post Update Trigger is also successfully created on the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "supervisor"
		And there is a valid record for "q-solution test 049" in the PNC
		When message id "q-solution/049" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

