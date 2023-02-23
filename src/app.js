import axios from 'axios';

console.log('Hallo daar!');

async function getCountry(name) {
    try {
        const countryUrl = 'https://restcountries.com/v2/name/' + name;
        const result = await axios.get(countryUrl);
        const country = result.data[0].name;
        console.log(country);

    } catch(e) {
        console.error(e);
    };
};

getCountry('Poland');