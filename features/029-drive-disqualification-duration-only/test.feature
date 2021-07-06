Feature: {029} R5.6_BR7 Driver Disqualification - Duration-only values

			"""
			{029} R5.6_BR7 Driver Disqualification - Duration-only values
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Driver Disqualification handling and automation of results where only a Duration value is received from Court.
			A 1st set of (Adjourment With Judgement) Court Hearing results are sent through the CJSE and onto Bichard7.
			A PNC Update is generated and the results from Court (Interim Disqualification) are successfully and automatically added onto the PNC.
			A PRE Trigger is also successfully created on the Portal.
			A 2nd set of (Sentence) Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents.
			The substantive result received (3071 - Disqualified from Driving - Discretionary) contains a Duration value.
			In addition an ancillary result (3050 - Disqualification from Driving Reduced if Course Completed) is also received.
			A PNC Update is generated and the results from Court are successfully and automatically added onto the PNC.
			A PRE Trigger is also successfully created on the Portal.

			MadeTech Definition:
			This tests that no exceptions but 1 trigger is created when driver disqualification is received from the court with duration value only.

			As this has two messages and the second one is against a changed record in the PNC, we need to get the mocks from running against the PNC
			to see how the enquiry response changes.
			"""

	Background:
		Given the data for this test is in the PNC

	@Should
	@Problem
	@NeedsRunningAgainstPNC
	@Excluded
	Scenario: No exceptions and one trigger when driver disqualification - duration only
		Given I am logged in as a "supervisor"
		When "input-message-1" is received
		And I view the list of exceptions
		Then there are no exceptions raised for "Patrick Duffy"
		And I see trigger "PR01 - Disqualified driver" in the exception list table
		When I open the record for "Duffy Patrick"
		And I click the "Triggers" tab
		Then I see trigger "TRPR0001 - Driver Disqualification - Update DD screen" in the exception list table
		And the PNC updates the record
		When "input-message-2" is received
		And I click the "Return To List (Unlock)" button
		And I view the list of exceptions
		Then there are no exceptions raised for "Patrick Duffy"
		And I see trigger "PR01 - Disqualified driver" in the exception list table
		When I open the record for "Duffy Patrick"
		And I click the "Triggers" tab
		Then I see trigger "TRPR0001 - Driver Disqualification - Update DD screen" in the exception list table
		And the PNC updates the record