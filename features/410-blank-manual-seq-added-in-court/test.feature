Feature: {410} Leaving Manual Sequence Number blank to make an offence Added in Court

			"""
			When there are duplicate offences with different results, but one is added in court, if the manual sequence number for the one
			added in court is left blank it will be added to the PNC.
			"""

	Background:
		Given the data for this test is in the PNC
			And "input-message" is received

	@Should
	Scenario: Leaving Manual Sequence Number blank to make an offence Added in Court
		Given I am logged in as "generalhandler"
			And I view the list of exceptions
		Then I see exception "HO100310 (2)" in the exception list table
		When I open the record for "RESULTTEXTISUSED DUPLICATEOFFENCEADDEDINCOURT"
			And I click the "Offences" tab
			And I view offence "1"
			And I correct "Sequence Number" to "1"
			And I submit the record
		Then I see exception "(Submitted)" in the exception list table
			And the PNC updates the record
