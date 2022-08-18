const baseURI = 'https://restcountries.com/v3.1/name';
const queryParams = 'fields=,name,capital,population,flags,languages';

export function fetchCountries(nameCountries) {
   return fetch(`${baseURI}/${nameCountries}?${queryParams}`)
      .then(response => {
         const { ok, status } = response;
         if (!ok) throw new Error(status);
         return response.json();
      })
      .catch(({ name, message }) => console.log(`${name}: ${message}`));
}
