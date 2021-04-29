Feature: Exception handler permissions

  Exception handlers can:
  - view and update exceptions
  - reallocate exceptions to another force area

  Background: Logging in
    Given a message is received
    And there is a valid record for "Rigout Dean" in the PNC
    And I am logged in as an "exception handler"
    When I view the list of exceptions

  Scenario: Exception handler can see exceptions
    Then I see exception "HO100300" in the "Reason" column
    And I cannot see "TRPR0010" in the "Reason" column

  Scenario: Exception handlers can handle exceptions
    And I open the record for "Rigout Dean"
    Then I can correct the exception
    
  Scenario: Exception handlers cannot see triggers
    And I open the record for "Rigout Dean"
    Then the "Triggers" menu item is not visible
    