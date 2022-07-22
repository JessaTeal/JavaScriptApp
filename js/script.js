let pokemonRepository = (function () {

  let pokemonList = [
    {
        name: 'Dewgong',
        height: 1.7,
        type: ['ice','water']
    },
    {
        name: 'Hoppip',
        height: .4,
        type: ['grass','flying']
    },
    {
        name: 'Gardevoir',
        height: 1.6,
        type: ['psychic','fairy']
    }
  ];


  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    }
  };

})();

document.write(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Pikachu', height: 1.7, type:['psychic', 'grass'] });
document.write(pokemonRepository.getAll());
