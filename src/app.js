import axios from 'axios';

const searchResult = document.getElementById('country');

async function getCountry(name) {
    searchResult.innerHTML = ``;
    try {
        const result = await axios.get(`https://restcountries.com/v2/name/${name}`);
        const country = result.data[0];
        searchResult.innerHTML = `
        <fieldset class="text-border">        
            <div class = "flag-and-countryname">
                <img class = "flag" src="${country.flag}" alt="Country flag">
                <h2>${country.name}</h2>
            </div>
                <p>${country.name} is situated in ${country.subregion}. It has a population of ${country.population} people</p>
                <p>The capital is ${country.capital} ${getCurrencies(country)}</p>
                <p>They speak ${country.languages[0].name}.</p>
        </fieldset>
    `
        console.log(country);
        console.log(result.data[0].translations.nl);
    } catch(e) {
        searchResult.innerHTML = `
        <p>U hebt een niet bestaand land ingevoerd, een typefout gemaakt,</p>
        <p>of er was een time-out in de netwerkverbinding. Probeer het nog eens!</p>
    `
        console.error(e);
    }
};

function getCurrencies(specificCountry) {
    let output = ' and you can pay with ';
    if (specificCountry.currencies.length === 2) {
        return output + `${specificCountry.currencies[0].name}'s and ${specificCountry.currencies[1].name}'s`;
    } else {
        return output + `${specificCountry.currencies[0].name}'s`;
    }
};

function inputCountry(e) {
    e.preventDefault();
    const searchCountry = document.getElementById('search-country');
    getCountry(searchCountry.value);
    searchCountry.value = '';
}

const searchForm = document.getElementById('search-form')
searchForm.addEventListener('submit', inputCountry);