Feature: {234} BR7 R5.5.1-PFI Change-1xCCR-PENHRG-DISARR

			"""
			{234} BR7 R5.5.1-PFI Change-1xCCR-PENHRG-DISARR
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Penalty Notice handling where an Offence is Added In Court.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The Bichard7 solution identifies that this update cannot be automated since the combination of PNC Message Types (PENHRG & DISARR) is not compatible.
			As a result an Exception is generated to indicate that manual resolution of the PNC is required and NO PNC Update is generated.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 234" in the PNC
		When message id "q-solution/234" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

