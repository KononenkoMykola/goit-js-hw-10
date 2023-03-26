import Notiflix from "notiflix";

function fetchCountries(name) { 
    return fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages').
    then(responce => {return responce.json()}).
    catch(error => {Notiflix.Notify.warning('Oops, there is no country with that name')})
}

export { fetchCountries };