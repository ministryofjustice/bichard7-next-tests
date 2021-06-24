Feature: {148} BR7 R5.2-RCD452-Extracting Remand Date-Group 1

			"""
			{148} BR7 R5.2-RCD452-Extracting Remand Date-Group 1
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Crown Court Remand handling where the Next Hearing details are only present in the ResultText.
			Court Hearing results are sent through the CJSE and onto Bichard7 containing a Remand (Adjournment With Judgement).
			However, the NextHearingDetails element contains no Next Hearing details.
			The solution recognises that these details (Date, Time and Location) are all present in the ResultText and the update to the PNC is generated based on this information instead.
			Successul update of the PNC is made.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 148" in the PNC
		When message id "q-solution/148" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

