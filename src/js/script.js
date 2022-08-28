let pokemonRepository2 = (function () {

  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn-lg', 'btn-outline-dark', 'col-sm-3');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function(){showDetails(pokemon)});
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository2.loadDetails(item).then(function showModal() {

        let modal = document.querySelector('.modal');
        modal.classList.add('.modal');

        let nameElement = document.querySelector('#modalTitle');
        nameElement.innerText = item.name;


        let modalBody = document.querySelector('.modal-body');

        let contentElement = document.createElement('div');
        contentElement.innerText = (item.height + ' meters long! ');

        let photoElement = document.createElement('img');
        photoElement.src = item.imageUrl;

        modalBody.innerHTML = '';

        modalBody.appendChild(contentElement);
        modalBody.appendChild(photoElement);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();


pokemonRepository2.loadList().then(function () {
  pokemonRepository2.getAll().forEach(function(pokemon) {
    pokemonRepository2.addListItem(pokemon);
  });
});
