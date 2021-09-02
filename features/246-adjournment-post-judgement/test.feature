Feature: {246} BR7 R5.6-RCD554-Offence Added In Court-Adj Post Judg-no PNC Adjudication

			"""
			{246} BR7 R5.6-RCD554-Offence Added In Court-Adj Post Judg-no PNC Adjudication
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Offences Added in Court behaviour and those changes to the Bichard7 solution brought about as part of RCD554.
			Offences Added In Court should not give rise to 'Inconsistent Result' exceptions.
			The solution should not attempt to add Offences classified as "Added In Court" with these Result Classes ("Adjournment Post Judgement" or "Sentence") and should raise Trigger TRPS0011 instead (in order that the remainder of the Results from Court may be automated).
			This Test will verify that an Offence Added In Court with a Result Class of "Adjournment Post Judgement" where the PNC has no Adjudication/Disposal will no longer generate an Exception and instead:
			- Generate a TRPS0011 Trigger
			- Automate the other Results received from Court
			Court Hearing Results are received Adjourning all Offences after a Verdict has already been reached (i.e.
			Adjournment Post Judgement).
			Offences are Added in Court at the same Hearing and are also resulted as "Adjournment Post Judgement".
			The Bichard7 solution recognises the Offences Added In Court and instead of generating an "Inconsistent Result" Exception:
			- Generates Post Update Triggers
			- Automates the remainder of the Results onto the PNC
			The PNC is successfully updated with Court Hearing Results and Triggers are also generated for the Offences Added In Court that cannot be automatically added to the PNC.

			MadeTech Definition:
			Handling offences added in court (Adjournment Post Judgement)
			"""

	Background:
		Given the data for this test is in the PNC

	@Should
	Scenario: Handling offences added in court (Adjournment Post Judgement)
		Given "input-message-1" is received
			And I am logged in as a "supervisor"
			And I view the list of exceptions
		Then there are no exceptions or triggers
		When "input-message-2" is received
		Then I see trigger "PS11 - Add offence to PNC" in the exception list table
			And there are no exceptions raised for "SENDEF TICS"
		When I open the record for "ADDOFFAPJNOPNCADJ NOEXCEPTION"
			And I click the "Triggers" tab
		Then I see trigger "TRPS0011" for offence "3"
			And I see trigger "TRPS0011" for offence "4"
			And the PNC updates the record