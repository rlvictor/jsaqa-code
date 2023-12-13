Feature: Booking a ticket for tomorrow

    Scenario: The user must select a seat and order a ticket
        Given user is on "/index.php" page
        When user select 2-th day and movie
        And select and book 8 row and 1 seat
        Then user received confirmation and qr-code

    Scenario: The user wants to check if the seat is booked
        Given user is on "/index.php" page
        When user select 2-th day and movie
        And select and book 8 row and 2 seat
        And user is on "/index.php" page
        When user select 2-th day and movie
        Then Book button is not active
        
    Scenario: user wants to order three tickets
        Given user is on "/index.php" page
        When user select 2-th day and movie
        And select and book 8 row and 8,9,10 seats
        Then user received confirmation and qr-code