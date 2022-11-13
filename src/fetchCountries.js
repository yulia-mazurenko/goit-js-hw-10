const BASE_URL = 'https://restcountries.com/v2/name/'
const options = 'fields=name,capital,population,flags,languages'

// export function fetchCountries(name) {
//     return fetch(`${BASE_URL}${name}?${options}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.status)
//                         }
//             return response.json()
                       
//         }
//         )
// }

export async function fetchCountries(name) {
    const response = await fetch(`${BASE_URL}${name}?${options}`);
    if (!response.ok) {
                throw new Error(response.status)
                        }
    const data = await response.json()
    return data
}
