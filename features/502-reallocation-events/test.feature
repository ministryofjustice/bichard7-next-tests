Feature: {502} Reallocation events

	Background:
		Given "input-message" is received

	@NextUI @AuditLog
	Scenario: Generates audit logs for case reallocation
		Given I am logged in as "generalhandler"
			And I view the list of exceptions
		Then I see trigger "PR10 - Conditional bail" in the exception list table
			And I see exception "HO100307" in the exception list table
		When I open the record for "Pacman Manny"
			And I reallocate the case to "BTP"
		Then the audit log contains "Hearing outcome reallocated by user"
			And the audit log contains "Exception unlocked"
			And the audit log contains "Trigger unlocked"
