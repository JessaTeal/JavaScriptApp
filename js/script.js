let pokemonRepository2 = (function () {

  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  const modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    pokemonList.push(pokemon);
  };

  function getAll() {
    return pokemonList;
  };

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn-lg', 'btn-outline-dark');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function(){showDetails(pokemon)});
  };

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
  };

  function showDetails(item) {
    pokemonRepository2.loadDetails(item).then(function showModal(name, height, image) {

        let modal = document.querySelector('.modal');

        let nameElement = document.querySelector('#modalTitle');
        nameElement.innerText = item.name;

        let contentElement = document.querySelector('.modal-body');
        contentElement.innerText = (item.height + ' meters long! ');

        let photoElement = document.createElement('img');
        photoElement.src = item.imageUrl;

        //modalContainer.innerHTML = '';

        //modal.appendChild(nameElement);
        //modal.appendChild(contentElement);
        //modal.appendChild(photoElement);
        //modalContainer.appendChild(modal);

    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      };
    });
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer){
        hideModal();
      };
    });
  };

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
