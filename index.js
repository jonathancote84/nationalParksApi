'use strict';


// api-key for national parks website 
const apiKey='viucwFRzyqvaAr6wKzZflhxQseEXsx1sjFK2pcf6';

const searchURL = 'https://developer.nps.gov/api/v1/parks';

// format query parameters 
function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function getNationalPark(query, maxResults=10) {
    //parameters for the query
    const params = {
        //params go in this object
        api_key: apiKey,
        stateCode: query,
        limit: maxResults


    };
    //sends those params to be formated 
    const queryString = formatQueryParams(params)
    //this bit allows for concatenation of the base url plus the query string
    const url = searchURL + '?' + queryString;

    //fetch api makes a GET call using (url)
    fetch(url)
        .then( response => {
            
            if (response.ok) {

                return response.json() ;
            }
            throw new Error(response.statusText) ;
        })
        //this does something; in this case console.log the response
        .then( responseJson => displayResults(responseJson))
        .catch( err => {
            $( '#js-error-message' ).text(`Something went wrong: ${err.message}`);

        });
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    //iterate through the items array data 
    for (let i = 0; i < responseJson.data.length; i++) {
        //for each park object in the data array
        //add a list item to the results
        //list with the video title, description.
        //and thumbnail
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></li>`

        )};
        //display the results section
        $('#results').removeClass('hidden');
}
//event listner for the submit button
function watchForm() {
    $( 'form' ).submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getNationalPark(searchTerm, maxResults);
    })
}

$(watchForm);