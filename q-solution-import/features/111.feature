Feature: {111} BR7 R5.1-RCD422-Standalone Breach-Order Revoked-Original Offence Resentenced

			"""
			{111} BR7 R5.1-RCD422-Standalone Breach-Order Revoked-Original Offence Resentenced
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Standalone Breach Offence handling, Results automation and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The Standalone Breach Offence is revoked and the original Offence is resentenced.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			Pre Update Triggers are also generated and the Triggers are marked as complete via the Portal.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 111" in the PNC
		When message id "q-solution/111" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

