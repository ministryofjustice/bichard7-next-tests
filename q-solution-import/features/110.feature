Feature: {110} BR7 R5.0-RCD385-PSA Code Change

			"""
			{110} BR7 R5.0-RCD385-PSA Code Change
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying the handling of Court Hearing Results where a Court sits inside another Court's building, Results automation (Judgement with Final Results) and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The solution ensures an accurate update to the PNC by recognising that the details of the Court are of those that sits inside another Court's building.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			Post Update Triggers are also generated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 110" in the PNC
		When message id "q-solution/110" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

