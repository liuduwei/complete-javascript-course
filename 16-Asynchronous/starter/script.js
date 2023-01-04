'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const request = new XMLHttpRequest();
request.open('get', 'https://restcountries.com/v3.1/name/china');
request.send();
console.log(request);

request.addEventListener('load', function () {
  const data = JSON.parse(this.responseText)[0];
  console.log(data);
  const html = `
        <article class="country">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.continents[0]}</h4>
            <p class="country__row"><span>👫</span>${
              data.population / 100000000
            }E</p>
            <p class="country__row"><span>🗣️</span>${data.languages.zho}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies.CNY.symbol
            }</p>
          </div>
        </article>
  `;

  countriesContainer.insertAdjacentHTML('afterbegin', html);
  countriesContainer.style.opacity = 1;
});
