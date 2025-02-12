async function getNasaData(date) {
    try {
        // API key details and URL information
        const apiKey = 'Oa3Ee5yc18CXotHhqya0vHLCCxq7zAdEWlDVeLia';
        const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

        console.info(`Fetching NASA APOD data for date: ${date}`);

        const response = await fetch(url);

        // Checking if the response is successful
        if (!response.ok) {
            console.error(`Error: Failed to fetch data. Status code: ${response.status}`);
            alert(`Failed to fetch data. Status code: ${response.status}`);
            return;
        }

        const data = await response.json();

        // Logging the retrieved data for debugging.
        console.log('NASA APOD Data:', data);

        // Error display message if the image is not available for the selected date
        if (data.code === 400) {
            console.warn("No data available for this date.");
            alert("No data available for this date. Please select another.");
            return;
        }

        // Title and description is getting updated.
        const potdTitle = document.querySelector('#potd-title');
        const potdDesc = document.querySelector('#potd-desc');
        const mediaContainer = document.querySelector('#potd-media');

        // Log the title and description for tracking purposes
        console.info(`Title: ${data.title}`);
        console.info(`Description: ${data.explanation}`);

        potdTitle.textContent = data.title;
        potdDesc.textContent = data.explanation;

        // Clear previous media content
        mediaContainer.innerHTML = '';

        // If else function for loading the image and video
        if (data.media_type === 'image') {
            console.info(`Loading image from URL: ${data.url}`);
            mediaContainer.innerHTML = `<img src="${data.url}" alt="${data.title}" style="max-width: 100%;"/>`;
        } else if (data.media_type === 'video') {
            console.info(`Loading video from URL: ${data.url}`);
            mediaContainer.innerHTML = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
        } else {
            console.warn(`Unknown media type: ${data.media_type}`);
        }

    } catch (error) {
        // Log the error with more context
        console.error("Error fetching NASA data:", error);
        alert("Failed to fetch data. Please try again later.");
    }
}

// Function to fetch the APOD based on selected date by the user
function fetchAPOD() {
    const dateInput = document.querySelector('#date-picker').value;
    if (dateInput) {
        console.info(`User selected date: ${dateInput}`);
        getNasaData(dateInput);
    } else {
        console.warn("No date selected. Prompting user to select a date.");
        alert("Please select a date.");
    }
}

// Setting the date to today and loading the APOD information
document.addEventListener("DOMContentLoaded", () => {
    const datePicker = document.querySelector('#date-picker');
    
    // Setting the default date today's in the local time
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-CA');  // using the correct YYYY-MM-DD format

    console.info(`Setting default date to today: ${formattedDate}`);
    
    datePicker.value = formattedDate; // Setting the input field picked to today's date
    getNasaData(formattedDate); // Loading APOD information on page loads.
});


// Attaching the event listener to the button
document.querySelector('#fetch-button').addEventListener('click', fetchAPOD);
