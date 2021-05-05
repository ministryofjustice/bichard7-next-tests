Feature: General handler permissions

  General handlers can:
  - view and update exceptions and triggers
  - reallocate exceptions to another force area

  Background: Logging in
    Given a message is received
    And there is a valid record for "Rigout Dean" in the PNC
    And I am logged in as a "general handler"
    When I view the list of exceptions

  Scenario: General handler can see triggers
    Then I see trigger "PR10 - Conditional bail" in the exception list table
    And I see "HO100300" in the exception list table

  Scenario: General handlers can handle exceptions
    And I open the record for "Rigout Dean"
    Then I can correct the exception
    
  Scenario: General handlers can handle triggers
    And I open the record for "Rigout Dean"
    Then the "Triggers" menu item is visible
    