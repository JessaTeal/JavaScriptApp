
let pokemonList = [
  {name: 'Dewgong', height: 1.7, type:['ice','water']},
  {name: 'Hoppip', height: .4, type:['grass','flying']},
  {name: 'Gardevoir', height: 1.6, type:['psychic','fairy']},
];

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1.5){
    document.write(pokemonList[i].name + " is " + pokemonList[i].height + " meters tall! " + " That's so tall!" + "<br>" + "<br>")
  }else if (pokemonList[i].height < .5){
    document.write(pokemonList[i].name + " is " + pokemonList[i].height + " meters tall! " + " It's so tiny!"+ "<br>" + "<br>")
  }else {
    document.write(pokemonList[i].name + " is " + pokemonList[i].height + " meters tall! " + "<br>" + "<br>")
  }
}


let pokemonRepository2 = (function () {

  let pokemonList = [
    {name: 'Dewgong', height: 1.7, type:['ice','water']},
    {name: 'Hoppip', height: .4, type:['grass','flying']},
    {name: 'Gardevoir', height: 1.6, type:['psychic','fairy']},
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

document.write(pokemonRepository2.getAll());
pokemonRepository2.add({ name: 'Pikachu', height: 2.7, type: ['grass','fairy']});
document.write(pokemonRepository2.getAll());
