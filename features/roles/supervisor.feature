Feature: Supervisor role

    Supervisors can:
    - run reports
    - perform quality control
    - manage their team

  Scenario: Supervisors can run reports
    Given I am logged in as a "supervisor"
    When I click the "Reports" menu button
    Then I am taken to a list of reports

  Scenario: Supervisors can see QA status of records
    Given a message is received
    And there is a valid record for "Rigout Dean" in the PNC
    When I log in as a "supervisor"
    Then I can see the QA status of a record

  Scenario: Supervisors can manage their team
    Given I am logged in as a "supervisor"
    When I click the "Team" menu button
    Then I am taken to the Team Management screen
    And I can add and remove members from my team
