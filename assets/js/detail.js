let countryName = new URLSearchParams(location.search).get('name');
console.log(countryName);
let country = document.querySelector('#country-name');
let nativeName = document.querySelector('#name');
let population = document.querySelector('#population');
let region = document.querySelector('#region');
let subRegion = document.querySelector('#sub-region'); 

let capital = document.querySelector('#capital');
let domain = document.querySelector('#domain');
let currency = document.querySelector('#currency');
let languages = document.querySelector('#languages');

let img = document.querySelector('#img');

let borders = document.getElementById('border-countries'); 

let back = document.querySelector('#back');

back.addEventListener('click', function() {
    history.back();
    
});


fetch(`https://restcountries.com/v3.1/name/${countryName}`).then(response => {
    console.log(response);
    return response.json();
}).then(data => {
    console.log(data);
    img.src = `${data[0].flags.png}`;
    country.innerHTML = `${data[0].name.common}`;
    data[0].name.nativeName ? nativeName.innerHTML = `${Object.values(data[0].name.nativeName)[0].common}` : nativeName.remove();
    population.innerHTML = `${data[0].population}`;
    region.innerHTML = `${data[0].region}`;
    data[0].subregion ? subRegion.innerHTML = `${data[0].subregion}` : subRegion.remove();
    capital.innerHTML = `${data[0].capital}`;
    currency.innerHTML = `${Object.values(data[0].currencies)[0].name}`;
    languages.innerHTML = `${Object.values(data[0].languages)}`;
    domain.innerHTML = `${data[0].tld}`;

    if (data[0].borders) {
        console.log(data[0].borders);
        data[0].borders.forEach(element => {
            // console.log(element);
            fetch (`https://restcountries.com/v3.1/alpha/${element}`).then (res => {
                return res.json();
            }).then (d => {
                // console.log(d[0].name.common);
                let borderName = document.createElement('a');
                borderName.innerHTML = `${d[0].name.common}` ;
                borderName.href = `./detail.html?name=${d[0].name.common}`;
                borders.appendChild(borderName);
            });
        })
    }
});

// dark.addEventListener("click", function (e) {
//     let dark = localStorage.getItem("dark");
//     if (dark === 'true' ) {
//        localStorage.setItem('dark', false);
//     }
//     else {
//        localStorage.setItem('dark',true);
//     }
//     document.body.classList.toggle('darkmode');
// });

// if (localStorage.getItem('dark') === true ) {
//    document.body.classList.add('darkmode');
// }

const dark = document.querySelector('#dark-mode');

dark.addEventListener("click", function (e) {
     let dark = localStorage.getItem("dark");
     if (dark === 'true' ) {
        localStorage.setItem('dark', false);
     }
     else {
        localStorage.setItem('dark',true);
     }
     document.body.classList.toggle('darkmode');
});

if (localStorage.getItem('dark') === true ) {
    // document.body.classList.add('darkmode');
    document.header.classList.add('darkmode');

}