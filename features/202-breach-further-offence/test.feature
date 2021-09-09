Feature: {202} BR7 R5.1-RCD422-Breach of Community Order-Revoked-Resentenced

			"""
			{202} BR7 R5.1-RCD422-Breach of Community Order-Revoked-Resentenced
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Breach Offence handling where a Further Offence is charged and Trigger generation.
			Court Hearing results are sent through the CJSE and onto Bichard7.
			Hearing Outcome XML is successfully created based on ResultedCaseMessage contents, successful queried response from PNC and also from static data tables held within the Exchange-hosted solution.
			The Defendant is given a Custodial Sentence for the further Offence.
			The original Sentence is Revoked and Resentenced and the Defendant is Sentenced to an additional Custodial Sentence to run concurrently with the further Offence.
			PNC Update is generated and the Court Hearing Results are successfully and automatically added onto the PNC (including the Breach Offence Added In Court).
			Pre and Post Update Triggers are also created on the Portal.

			MadeTech Definition:
			Breach Offence handling where a Further Offence is charged
			"""

	Background:
		Given the data for this test is in the PNC

	@Could
	Scenario: Breach Offence handling where a Further Offence is charged
		Given "input-message-1" is received
			And I am logged in as "supervisor"
			And I view the list of exceptions
		Then there are no exceptions or triggers
		When "input-message-2" is received
		Then there are no exceptions raised for "COMMUNITYORDER BREACH"
			And I see trigger "PR06 - Imprisoned" in the exception list table
		When I open the record for "COMMUNITYORDER BREACH"
			And I click the "Triggers" tab
		Then I see trigger "TRPR0020" for offence "2"
			And I see trigger "TRPR0020" for offence "3"
			And I see trigger "TRPS0010" for offence "2"
			And the PNC updates the record
