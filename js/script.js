let pokemonRepository2 = (function () {

  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  const modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.add('modal-dialog-centered')

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
    button.classList.add('btn-lg');
    button.classList.add('btn-outline-dark');
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
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-footer');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let nameElement = document.createElement('h1');
        nameElement.classList.add('.modal-title');
        nameElement.innerText = item.name;

        let contentElement = document.createElement('p');
        contentElement.classList.add('.modal-body');
        contentElement.innerText = item.height + ' meters long! ';

        let photoElement = document.createElement('img');
        photoElement.classList.add('.modal-body');
        photoElement.src = item.imageUrl;

        modal.appendChild(nameElement);
        modal.appendChild(contentElement);
        modal.appendChild(photoElement);
        modalContainer.appendChild(modal);
        modal.appendChild(closeButtonElement);


        modalContainer.classList.add('is-visible');
    });
    function hideModal() {
      modalContainer.classList.remove('is-visible');
    };

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
