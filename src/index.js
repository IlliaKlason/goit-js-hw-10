import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

// Оставил как пример
// const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const searchCountry = e => {
   const searchName = searchBox.value.trim();

   fetchCountries(searchName)
      .then(data => {
         countriesData(data);
      })
      .catch(() => {
         if (searchName !== '') {
            Notiflix.Notify.failure('Oops, there is no country with that name');
         }
      });

   e.preventDefault();
};
searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function countriesData(data) {
   clearData(countryList);
   clearData(countryInfo);
   if (data.length > 10) {

      Notiflix.Notify.info(
         'Too many matches found. Please enter a more specific name.'
      );
   } else if (data.length > 1 && data.length <= 10) {
      const { flags: { svg }, name: { common } } = data[0]
      return (countryList.innerHTML =
         `
                    <li class = 'country'>
                        <img src = '${svg}' />
                        <p style='color: ${getRandomHexColor()}'>${common}</p>
                    </li>
                `
      );
   } else {
      return (countryInfo.innerHTML = data
         .map(
            ({ flags: { svg }, name: { common }, capital, population, languages }) => `
                    <div class = 'country'>
                        <img src = '${svg}' />
                        <div class = 'country-body'>
                            <h3>${common}</h3>
                            <p><b>Capital: </b> ${capital}</p>
                            <p><b>Population: </b> ${population}</p>
                            <p><b>Languages: </b> ${Object.values(languages)}</p>
                        </div>
                    </div>
                `
         )
         .join(''));
   }
}

function clearData(element) {
   element.innerHTML = '';
}

searchBox.placeholder = 'Find information about country...';
// Оставил как пример
// document.querySelector('#searchBox').placeholder = 'Find information about country...';