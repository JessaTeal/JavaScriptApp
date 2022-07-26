let pokemonRepository2 = (function () {

  let pokemonList = [
    {name: 'Dewgong', height: 1.7, type:['ice','water']},
    {name: 'Hoppip', height: .4, type:['grass','flying']},
    {name: 'Gardevoir', height: 1.6, type:['psychic','fairy']}
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };

})();

let item = [
  {name: 'Pikachu', height: 2.7, type:['grass','fairy']}
];

pokemonRepository2.add(item);

pokemonRepository2.getAll().forEach(function(pokemonList) {
  document.write('<p>' + pokemonList.name + ' is ' + pokemonList.height + ' meters tall and is ' + pokemonList.type + ' types! </p>');
});
