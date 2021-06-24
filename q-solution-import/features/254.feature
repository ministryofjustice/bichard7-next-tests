Feature: {254} BR7 R5.7-RCD612-Force Owner Court Area MISmatch-NO Trigger Exclusions

			"""
			{254} BR7 R5.7-RCD612-Force Owner Court Area MISmatch-NO Trigger Exclusions
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Out of Area Trigger handling:
			Court Hearing results are sent through the CJSE and onto Bichard7 detailing conviction of a Sexual Offence, an Order and the addition of 2x Offences in Court.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from the PNC and also from static data tables held within the Exchange-hosted solution.
			No "Out of Area" Trigger is raised.
			Whilst the Case is heard in a different Area to the Police Force responsible for the Case there are no additional Triggers which would have otherwise been created.
			The PNC is successfully updated with the results from Court.
			The Offences Added In Court are added to the PNC (since a DISARR is created).
			Pre Update and Post Update Triggers are also generated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 254" in the PNC
		When message id "q-solution/254" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

