document.getElementById('admin-link').addEventListener('click', function(event) {
    event.preventDefault();
    var loginSection = document.getElementById('login-section');
    loginSection.style.display = loginSection.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function(event) {
    var loginSection = document.getElementById('login-section');
    var adminLink = document.getElementById('admin-link');
    if (loginSection.style.display === 'block' && !loginSection.contains(event.target) && !adminLink.contains(event.target)) {
        loginSection.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Define the seat layout (5 rows with 6 seats each)
    const seatLayout = [
        { row: 1, seats: ['A', 'B', 'C', 'D', 'E', 'F'] },
        { row: 2, seats: ['A', 'B', 'C', 'D', 'E', 'F'] },
        { row: 3, seats: ['A', 'B', 'C', 'D', 'E', 'F'] },
        { row: 4, seats: ['A', 'B', 'C', 'D', 'E', 'F'] },
        { row: 5, seats: ['A', 'B', 'C', 'D', 'E', 'F'] }
    ];

    const seatContainer = document.getElementById('seating-layout');

    seatLayout.forEach(({ row, seats }) => {
        // Create a row container
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        // Create the left and right seat groups
        const leftSeats = document.createElement('div');
        leftSeats.classList.add('left-seats');
        const rightSeats = document.createElement('div');
        rightSeats.classList.add('right-seats');

        // Loop through each seat and create buttons
        seats.forEach((seat, index) => {
            const seatButton = document.createElement('button');
            seatButton.classList.add('seat');
            seatButton.setAttribute('data-seat', `${row}${seat}`);
            seatButton.textContent = `${row}${seat}`;

            // Add event listener to handle seat selection
            seatButton.addEventListener('click', function () {
                // Deselect any previously selected seat
                document.querySelectorAll('.seat').forEach(seat => seat.classList.remove('selected'));
                this.classList.add('selected'); // Mark as selected

                const selectedSeat = this.getAttribute('data-seat');
                document.getElementById('selected-seat').value = selectedSeat;
                document.getElementById('submit-button').disabled = false; // Enable submit button when seat is selected
            });

            // Assign seat to left or right side
            if (index < 3) {
                leftSeats.appendChild(seatButton); // Seats A, B, C
            } else {
                rightSeats.appendChild(seatButton); // Seats D, E, F
            }
        });

        // Add aisle divider between the left and right sections
        const aisle = document.createElement('span');
        aisle.classList.add('aisle');

        //left seats, aisle, and right seats to the row
        rowDiv.appendChild(leftSeats);
        rowDiv.appendChild(aisle);
        rowDiv.appendChild(rightSeats);

        seatContainer.appendChild(rowDiv);
    });
});

// Login and logout
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("admin-login-form").addEventListener("submit", function(event) {
        event.preventDefault(); 

        const adminId = document.getElementById("admin-id").value;
        const adminPassword = document.getElementById("admin-password").value;

        if (adminId === "Adminjet" && adminPassword === "AdminJet123") {
            sessionStorage.setItem('adminLoggedIn', 'true');
            
            window.location.href = "HTML/admin.html";
        } else {
            document.getElementById("error-message").style.display = "block";
        }
    });
});

window.onload = function() {
    if (window.location.pathname.includes("admin.html")) {
        if (!sessionStorage.getItem('adminLoggedIn')) {
            window.location.replace("../index.html");
        }
    }
};

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoggedIn');

    window.location.replace("../index.html");
}
