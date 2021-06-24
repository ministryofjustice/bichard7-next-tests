Feature: {302} BR7-R5.9-RCD607-Twice Breached-Same ASN incorrectly re-used

			"""
			{302} BR7-R5.9-RCD607-Twice Breached-Same ASN incorrectly re-used
			===============
			Q-Solution Definition:
			A Bichard7 Regression Test verifying Standalone Breach processing where the original ASN is (incorrectly) re-used.
			A 1st set of Court Hearing Results are received from Court containing Final Results for a Breach Offence.
			The Offence is Dismissed and the details are successfully added onto the PNC.
			A 2nd set of Court Hearing Results are received from Court.
			The original ASN is re-used incorrectly.
			The set of Results received is identical to those already held on the PNC and the Court Hearing is therefore purposely ignored.
			An Event (GEL) is logged to note that this decision has been made.
			A 3rd set of Court Hearing Results are received from Court.
			The original ASN is re-used incorrectly.
			The set of Results this time around is different to those already present on the PNC.
			However, since the PNC already holds Final Results for the record (i.e.
			the original Dismissal of the Case) an Exception is generated on the Portal to indicate this inconsistency to the user.

			MadeTech Definition:
			<add concise test definition here>
			"""

	@Could
	@NeedsValidating
	@NeedsRunningAgainstPNC
	Scenario: <add human readable test description>
		Given I am logged in as a "general handler"
		And there is a valid record for "q-solution test 302" in the PNC
		When message id "q-solution/302" is received
		And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
		And pending

