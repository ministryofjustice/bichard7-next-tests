Feature: {074} R4.0_BR7_Stripout Conviction for 2058-2059-2060

			"""
			{074} R4.0_BR7_Stripout Conviction for 2058-2059-2060
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Court Results automation (Adjournment with Judgement & Judgement with Final Result) and the stripping of Adjudication values received from the Court for specific Result Codes.
			Court Hearing results are sent through the CJSE and onto Bichard7 where Offences have been 'Carried Forward to Court Case' or 'Replaced With Another Offence' (Result Codes 2059 & 2060).
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			PNC Update is generated and the Court Hearing Results are successfully added automatically onto the PNC.
			The solution will strip the Adjudication values received from Court in order for the update to be considered acceptable to the PNC.
			Post Update Triggers are also successfully created on the Portal.

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
