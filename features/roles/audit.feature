Feature: Audit role

  Auditors can view resolved and unresolved exceptions/triggers, but they cannot update them. (i.e. read-only access)

  Scenario: Auditors have read only access
    Given a message is received
    And there is a valid record for "Rigout Dean" in the PNC
    And I am logged in as a user with "audit" permissions
    When I view the list of exceptions
    And I open the record for "Rigout Dean"
    Then I can see exceptions
    And I can see triggers
    And I cannot make any changes
