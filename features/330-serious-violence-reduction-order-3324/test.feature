Feature: {330} Result code 3324 (Serious Violence Reduction Order) should raise trigger TRPR0003

			"""
			Determining the behaviour when the result code 3324 appears in an offence
			- Record exists in PNC with one offence with offence code: SX03001A
			- CP sends resulted case message with result code 3324 for offence

			Result:
			- Bichard updates the PNC
			- Bichard raises trigger TRPR0003
			"""

	Background:
		Given the data for this test is in the PNC
			And "input-message" is received

	@Should
	@LoadTestUI
	@NextUI
	Scenario: trigger is correctly generated for sexual offences (Serious Violence Reduction Order)
		Given I am logged in as "supervisor"
			And I view the list of exceptions
		When I open this record
			And I click the "Triggers" tab
		Then I see trigger "TRPR0003" for offence "1"
			And I see trigger "TRPR0004" for offence "1"
			And I see trigger "TRPR0004" for offence "2"
			And the PNC updates the record
		When I resolve all of the triggers
		Then this "record" is "resolved"
			And this "record" is not "unresolved"
			And there are no exceptions for this record
