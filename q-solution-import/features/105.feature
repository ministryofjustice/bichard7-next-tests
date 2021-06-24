Feature: {105} BR7 R5.0-RCD334-4583-Some Offences Ignored

			"""
			{105} BR7 R5.0-RCD334-4583-Some Offences Ignored
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Ignored Results (Offences) Results automation (Judgement with Final Result) and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The solution recognises that an additional Offence (which is not on the PNC) has been resulted in error (i.e.
			using Result Code 4583) and this Offence and its associated results are stripped from the update that will be sent to the PNC.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			Pre and Post Update Triggers are also generated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Should
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 105" in the PNC
		When message id "q-solution/105" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

