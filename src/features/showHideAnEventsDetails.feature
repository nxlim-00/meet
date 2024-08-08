Feature: Show/Hide an Event's Details
  Scenario: An event element is collapsed by default
    Given the user have just opened the app
    When the user views the events list
    Then all events details should be hidden

  Scenario: User can expand an event to see its details
    Given the user have just opened the app
    When the user clicks on the details button of one of the events
    Then the event's details should be shown
    And the event's details button title will be adjusted to (hide details)

  Scenario: User can collapse an event to hide its details.
    Given the event's details are shown
    And the event's Details button title is (hide details)
    When the user clicks on Details button of that event.
    Then the event's details should be hidden.
    And the event's Details button title will be adjusted to (show details)