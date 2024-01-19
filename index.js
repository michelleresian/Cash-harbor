// API access key for Unsplash
const accessKey = "Jdt7KLPS0eERHiVnRrpcq0m5Tdd7DCwcdieUTu-XCNA";

// References to HTML elements
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

// Initial page number for API pagination
let page = 1;

// Async function to fetch and display images based on user input
async function searchImages() {
    // Get user input from the search input field
    const inputData = inputEl.value;

    // Construct the URL for the Unsplash API based on the user input and page number
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        // Fetch data from the Unsplash API
        const response = await fetch(url);
        const data = await response.json();

        // Extract results from the API response
        const results = data.results;

        // Clear the search results container if it's the first page
        if (page === 1) {
            searchResults.innerHTML = "";
        }

        // Iterate through each result and create HTML elements for images and links
        results.forEach((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("search-result");

            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;

            const imagelink = document.createElement('a');
            imagelink.target = "_blank";
            imagelink.href = result.links.html;
            imagelink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imagelink);

            // Append the image wrapper to the search results container
            searchResults.appendChild(imageWrapper);
        });

        // Display or hide the "Show more" button based on the number of results
        if (results.length > 0) {
            showMore.style.display = "block";
        } else {
            showMore.style.display = "none";
        }
    } catch (error) {
        // Log an error message if there's an issue with the API request
        console.error("Error fetching data:", error);
    }
}

// Event listener for the form submission to initiate image search
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

// Event listener for the "Show more" button to fetch additional images
showMore.addEventListener("click", searchImages);