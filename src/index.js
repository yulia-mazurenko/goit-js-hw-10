import './css/styles.css';
import countriesListTpl from './templates/countries-list.hbs'
import countryCardTpl from './templates/country-card.hbs'
import { fetchCountries } from './fetchCountries.js'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
let getEl = selector => document.querySelector(selector)

getEl('#search-box').addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY))

function onFormInput(e) {
    resetData();

    let searchingCountry = (e.target.value).trim();
    
    if (searchingCountry === '') {
         resetData()
        return
    } 
       
    fetchCountries(searchingCountry).then(renderMarkup).catch(onFetchError)  
}

function resetData() {
    getEl('.country__list').innerHTML = '';
    getEl('.country__info').innerHTML = '';
}

function renderMarkup(data) {
    
    // if (data.message === 'Not Found') {
    //    onFetchError() 
    // }
       
    if (data.length > 10) {
        onDisplayNotification()        
    }

    else if (data.length >= 2 && data.length <= 10) {
        makeMarkupList(data)        
    }
        
    else if (data.length === 1) {
        makeMarkupCard(data)       
    }        
}

function onDisplayNotification() {
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
 }       

function onFetchError(data) {    
    Notiflix.Notify.failure("Oops, there is no country with that name");
}

function makeMarkupList(data) {
    const markupList = countriesListTpl(data);
    getEl('.country__list').insertAdjacentHTML('beforeend', markupList);
}

function makeMarkupCard(data) {
    const markupCard = countryCardTpl(data);
    getEl('.country__info').insertAdjacentHTML('beforeend', markupCard);
}