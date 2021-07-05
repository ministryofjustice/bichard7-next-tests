Feature: {276} BR7 R5.8-RCD626 - Offences Added in Court Adjourned Sine Die Case-Undated FTA Warrant Issued

			"""
			{276} BR7 R5.8-RCD626 - Offences Added in Court Adjourned Sine Die Case-Undated FTA Warrant Issued
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test which verifies Warrant Results (Undated) where Offences are Added In Court that are also Adjourned Sine Die at the same time.
			Court Hearing Results containing an Undated Warrant for an existing Offence are sent through the CJSE and onto Bichard7.
			The Results from Court also include Offences Added In Court, which are Adjourned Sine Die.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The PNC is successfully updated with the Warrant (Remand) details.
			The Offences Added In Court cannot be added to the PNC at this point but instead Post Update Triggers are generated to indicate the additional work required to add this information manually onto the PNC.
			Pre Update Triggers are also generated.

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
