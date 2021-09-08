Feature: Warm-up test
    In order to make sure the system is working and has warmed up
    I want to login to Bichard and view the Exception List table

    Scenario: Login to Bichard
        Given I am logged in as "exceptionhandler"
        When I view the list of exceptions
