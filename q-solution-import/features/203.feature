Feature: {203} BR7 R5.1-RCD422-Breach of Suspended Sentence-Order to Continue-Varied

			"""
			{203} BR7 R5.1-RCD422-Breach of Suspended Sentence-Order to Continue-Varied
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Breach Offence handling where a Further Offence is charged, Exception and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The Further Offence is Sentenced and the Breach (received from Court as Offence Code 'CJ03507') is dealt with by Re-Sentencing the original Offence under Result Code '1508'.
			'1508' is a Result Code that is not accepted by the PNC and so the PNC Update message sent by Bichard7 to the PNC generates an Exception instead of a successful PNC Update.
			Pre Update Triggers are also created.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution/203" in the PNC
		When message id "q-solution/203" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending
