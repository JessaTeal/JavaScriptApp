let pokemonList = [
  {name: 'Dewgong', height: 1.7, type:['ice','water']},
  {name: 'Hoppip', height: .4, type:['grass','flying']},
  {name: 'Gardevoir', height: 1.6, type:['psychic','fairy']},
];

for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + " is " + pokemonList[i].height + " meters tall! " + "<br>" + "<br>")
}
