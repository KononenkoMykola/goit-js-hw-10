import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from "./js/fetchCountries"
import Notiflix from "notiflix";

const DEBOUNCE_DELAY = 300;
const ulList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const input = document.querySelector('#search-box');
const elem = [];

input.addEventListener('input', debounce(() => {
    ulList.innerHTML = ""; 
    countryInfo.innerHTML = "";
    const name = input.value.trim();
    
    if (name == "") {
        return;
    } else {
        fetchCountries(name).
        then(countries => {

            const desiredCountry = countries.filter(country => country.name.official.toLowerCase().includes(name));
            
            if (desiredCountry.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
    
            if (desiredCountry.length > 1 && desiredCountry.length <= 10) {
                markupListCountries(desiredCountry);   
            } 
    
            if (desiredCountry.length == 1) {
                markupInfoCountries(desiredCountry);
            }
    
            if (desiredCountry.length == 0) {
                Notiflix.Notify.failure('Oops, there is no country with that name')
            }
        }).
        catch(error => {Notiflix.Notify.warning('Oops, there is no country with that name')});
    }    
}, DEBOUNCE_DELAY)
);


function markupListCountries(array) {
    const markup = array.map(country =>{
        return `<li class="country-card">
        <div class="country-flag">
        <img src="${country.flags.svg}" alt="" width = 30 height = 30>
        </div>
        <p class="country-name">${country.name.official}</p>
        </li>`
    }).join("");
    ulList.insertAdjacentHTML('beforeend', markup);
}


function markupInfoCountries(array) {
    const markup = array.map(country => {
        return `<div class="country-card">
    <div class="country-flag">
    <img src="${country.flags.svg}" alt="" width = 30 height = 30>
    </div>
    <h1 class="country-name">${country.name.official}</h1>
    </div>
    <p><b>Capital:</b>  ${country.capital}</p>
    <p><b>Population:</b>  ${country.population}</p>
    <p><b>Languages:</b>  ${ Object.values(country.languages)}</p>`
    })
    countryInfo.insertAdjacentHTML('beforeend', markup);
}
