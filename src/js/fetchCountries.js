export function fetchCountries(nameCountries) {
   return fetch(`https://restcountries.com/v3.1/name/${nameCountries}?fields=,name,capital,population,flags,languages`)
      .then(response => {
         const { ok, status } = response;
         if (!ok) {
            throw new Error(status);
         }
         return response.json();
      })
      .catch(({ name, message }) => console.log(`${name}: ${message}`));
}
