// Toggle anime name extension (expandable)
function toggleText(element) {
    const showMore = element.querySelector('.show-more');
    showMore.style.display = (showMore.style.display === 'none' || showMore.style.display === '') ? 'inline' : 'none';
}

// Show the episode count and change the main anime image for the selected season
function showEpisodes(selectElement) {
    const seasonId = selectElement.value;
    const allEpisodes = document.querySelectorAll('.episode-count');
    const animeItem = selectElement.closest('.anime-item');
    const animeImage = animeItem.querySelector('img');

    // Hide all episode counts first
    allEpisodes.forEach(episode => {
        episode.style.display = 'none'; // Use display to hide
    });

    // Reset the image to the default when --Select Season-- is chosen
    if (!seasonId) {
        animeImage.src = animeItem.dataset.originalSrc; // Reset to the original image
        document.getElementById('default-image').style.display = 'block'; // Show the default image
        return;
    } else {
        document.getElementById('default-image').style.display = 'none'; // Hide the default image when a season is selected
    }

    // Show the selected season's episode count and change the image
    if (seasonId) {
        document.getElementById(seasonId).style.display = 'block'; // Change back to display

        // Set the image based on the selected season
        let newImageSrc = '';
        if (animeItem.querySelector('.anime-name').textContent.includes('Assassination Classroom')) {
            if (seasonId === 'season1-1') {
                newImageSrc = 'image/Anime-photos/Chainsaw man 2.jpe'; 
            }
        } else if (animeItem.querySelector('.anime-name').textContent.includes('Attack on Titan')) {
            // Add Attack on Titan season images here
        } else if (animeItem.querySelector('.anime-name').textContent.includes('One Piece')) {
            // Add One Piece season images here
        }

        // Set the image to the selected season's image if available
        if (newImageSrc) {
            animeImage.src = newImageSrc;
        } else {
            animeImage.src = animeItem.dataset.originalSrc; // Fallback to the original image if no new source is found
        }
    }
}

// Toggle Filter Menu
function toggleFilterMenu() {
    const filterMenu = document.getElementById('filter-menu');
    filterMenu.style.display = filterMenu.style.display === 'none' || filterMenu.style.display === '' ? 'block' : 'none';
}

// Apply Filter
let currentOrder = 'asc'; // Default order for sorting

function applyFilter() {
    const filterValue = document.getElementById('filter-select').value;
    const animeItems = document.querySelectorAll('.anime-item');
    const animeList = document.querySelector('.anime-list');

    // Convert NodeList to an array for sorting
    const itemsArray = Array.from(animeItems);

    // Sort based on the selected filter
    let sortedItems;

    if (filterValue === 'alphabetical') {
        sortedItems = itemsArray.sort((a, b) => {
            const nameA = a.querySelector('.anime-name').textContent.toLowerCase();
            const nameB = b.querySelector('.anime-name').textContent.toLowerCase();
            return currentOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
    } else if (filterValue === 'rating') {
        sortedItems = itemsArray.sort((a, b) => {
            const scoreB = parseFloat(b.querySelector('.score').textContent.match(/(\d+(\.\d+)?)/)[0]);
            const scoreA = parseFloat(a.querySelector('.score').textContent.match(/(\d+(\.\d+)?)/)[0]);
            return currentOrder === 'asc' ? scoreB - scoreA : scoreA - scoreB; // Sort in the selected order
        });
    } else if (filterValue === 'genre') {
        sortedItems = itemsArray.sort((a, b) => {
            const genreA = a.querySelector('.genre').textContent.toLowerCase();
            const genreB = b.querySelector('.genre').textContent.toLowerCase();
            return currentOrder === 'asc' ? genreA.localeCompare(genreB) : genreB.localeCompare(genreA);
        });
    } else {
        sortedItems = itemsArray; // If no filter is selected, show all items
    }

    // Clear the current list and append the sorted items
    animeList.innerHTML = '';
    sortedItems.forEach(item => animeList.appendChild(item));
}

// Swap function to toggle order
function swapOrder() {
    currentOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    applyFilter(); // Reapply the filter to reflect the order change
}
