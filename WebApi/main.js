const exercise1 = document.getElementById("ex-1-out");
const exercise2 = document.getElementById("ex-2-out");
const exercise3 = document.getElementById("ex-3-out");
const exercise4 = document.getElementById("ex-4-out");

/* *********** */
/* EXERCISE 1 */
/* ********* */

const openWeatherUrl = new URL("https://api.openweathermap.org/");
openWeatherUrl.pathname = "data/2.5/weather";
openWeatherUrl.searchParams.set("lat", "60.522190");
openWeatherUrl.searchParams.set("lon", "15.740980");
openWeatherUrl.searchParams.set("units", "metric");
openWeatherUrl.searchParams.set("appid", "1626cd6780915e22fbaccf1a84d0db53");

exercise1.textContent = openWeatherUrl;

/* *********** */
/* EXERCISE 2 */
/* ********* */

fetch(openWeatherUrl)
  .then((response) => response.json())
  .then((jsonData) => {
    exercise2.textContent = JSON.stringify(jsonData);
  })
  .catch((err) => console.log(err));

/* *********** */
/* EXERCISE 3 */
/* ********* */

let xhr = new XMLHttpRequest();

xhr.open("get", openWeatherUrl);

xhr.responseType = "json";

xhr.onload = function () {
  console.log(`status: ${xhr.status}`);
  console.log(`response:`, JSON.stringify(xhr.response));
  exercise3.textContent = JSON.stringify(xhr.response);
};

xhr.onerror = function () {
  console.log("ERROR!! ABORT!!");
};

xhr.onprogress = function (e) {
  console.log(`Received ${e.loaded} bytes, of total ${e.total} bytes`);
};

xhr.send();

/* *********** */
/* EXERCISE 4 */
/* ********* */

fetch(openWeatherUrl)
  .then((response) => response.json())
  .then((data) => {
    let temp = data.main.temp;
    let tempfeelslike = data.main.feels_like;
    let weather = data.weather[0].main;
    let weatherDesc = data.weather[0].description;
    let icon = data.weather[0].icon;
    let setIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    exercise4.innerHTML = /* HTML */ `
      <div class="ex4">${weather}</div>
      <img src="${setIcon}" />
      <div class="ex4">${weatherDesc}</div>
      <div>
        Temperature: ${temp} &#x2103; , feels like ${tempfeelslike} &#x2103;
      </div>
    `;
  })
  .catch((err) => console.log(err));

/* *********** */
/* EXERCISE 5 */
/* ********* */

const blogURL = new URL("https://jsonplaceholder.typicode.com");
blogURL.pathname = "/posts";
blogURL.searchParams.set("id", "1");

const authorURL = new URL("https://jsonplaceholder.typicode.com");
authorURL.pathname = "/users";
authorURL.searchParams.set("id", "1");

const commentURL = new URL("https://jsonplaceholder.typicode.com");
commentURL.pathname = "/posts/1/comments";
commentURL.searchParams.set("_limit", 3);

fetch(blogURL)
  .then((response) => {
    return response.json();
  })
  .then((posts) => {
    const title = posts[0].title;
    const body = posts[0].body;
    document.getElementById("ex-5-title").textContent = title;
    document.getElementById("ex-5-content").textContent = body;
  });

fetch(authorURL)
  .then((response) => {
    return response.json();
  })
  .then((users) => {
    const author = users[0].name;
    document.getElementById("ex-5-author").textContent = author;
  });

fetch(commentURL)
  .then((response) => {
    return response.json();
  })
  .then((comments) => {
    const commmentElement = document.getElementById("ex-5-comments");
    commmentElement.innerHTML = "";

    for (let comment of comments) {
      commmentElement.innerHTML += /* HTML */ ` <div class="comment">
        <h3>${comment.email}</h3>
        <p>${comment.body}</p>
      </div>`;
    }
  })
  .catch((err) => console.log(err));

/* *********** */
/* EXERCISE 6 */
/* ********* */

/* POKEAPI URL SETUP */

function randomNumber() {
  return Math.floor(Math.random() * 1118) + 1;
}

let currentPokemon = randomNumber();

const pokeUrl = new URL("https://pokeapi.co");
pokeUrl.pathname = `/api/v2/pokemon/${currentPokemon}`;

const pokeDescUrl = new URL("https://pokeapi.co");
pokeDescUrl.pathname = `/api/v2/pokemon-species/${currentPokemon}`;

fetch(pokeUrl)
  .then((response) => {
    console.log(response);
    if (response.ok) {
      return response.json();
    } else {
      throw "Something went wrong, status: " + response.status;
    }
  })
  .then((pokeData) => {
    console.log(pokeData);
    document.getElementById("ex-6-name").textContent = pokeData.species.name;
    document.getElementById(
      "ex-6-sprite"
    ).src = `${pokeData.sprites.front_default}`;
  })
  .catch((err) => console.log(err));

fetch(pokeDescUrl)
  .then((response) => {
    console.log(response);
    if (response.ok) {
      return response.json();
    } else {
      throw "Something went wrong, status: " + response.status;
    }
  })
  .then((pokeDesc) => {
    console.log(pokeDesc);

    pokeDesc.flavor_text_entries.every((pokemon) => {
      if (
        pokemon.language.name == "en" &&
        (pokemon.version.name == "blue" ||
          pokemon.version.name == "diamond" ||
          pokemon.version.name == "black" ||
          pokemon.version.name == "x" ||
          pokemon.version.name == "sun")
      ) {
        document.getElementById("ex-6-flavortext").textContent =
          pokemon.flavor_text;

        return false;
      }
      return true;
    });
  });
