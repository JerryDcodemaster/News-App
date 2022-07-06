import reddit from './redditapi';


const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// FORM EVENT LISTENER.
searchForm.addEventListener('submit', e => {

    // GET SEARCH TERM
    const searchTerm = searchInput.value;

    // GET SORT
    const sortBy = document.querySelector('input[name="sortby"]: checked').value;

    // GET LIMiT
    const searchLimit = document.getElementById('limit').value;

    // CHECK INPUT
    if(searchTerm === '') {
        // SHOW MESSAGE
        showMessage('please add a search term', 'alert-danger');
    }

    // Clear Input
    searchInput.value = '';

    // Search Reddit
        reddit.search(searchTerm, searchLimit, sortBy).then
        (results => {
            console.log(results);
            let output = '<div class = "card-columns">';
            // Loop through posts
            results.forEach(post => {

                // CHECK FOR IMAGE
                const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
                output += `
                    <div class = "card">
                        <img class = "card-img-top" src"${image}">
                    <div class = "card-body">
                    <h5 class = "card-title">${post.title}</h5>
                    <p class = "card-text">${truncateText(post.selftext, 100)}</p>
                    <a href = "${post.url}" target = "_blank" class = "btn btn-primary"> Read  More</a>
                    <hr>
                        <span class = "badge badge-secondary">Subreddit: ${post.subreddit}</span>
                        <span class = "badge badge-dark">Score: ${post.score}</span>
                    </div>
                    </div>
                `;
            });
            output += '</div>';
            document.getElementById('results').innerHTML = output;
        })
         

    e.preventDefault();
});

// SHOW MESSAGE
function showMessage (message, className){
//  CREATE DIV
const div = document.createElement('div');

// ADD CLASSES
div.className = `alert ${className}`;

// ADD TEXT
div.appendChild(document.createTextNode(message));

// Get Parent
const searchContainer = document.getElementById('search-container');

// Get Search
const search = document.getElementById('search');

// Insert Message
searchContainer.insertBefore(div, search);

// Timeout Alert
setTimeout(() => document.querySelector('.alert').remove(), 3000);
}


// TRUNCATE TEXT
function truncateText (text, limit) {
    const shortened = text.indexOf('', limit);
    if (shortened == -1) return text;
    return text.substring(0, shortened);
}