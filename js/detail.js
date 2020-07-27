
(function(){

  let url = window.location.href;
  let getId = parseInt(url.substring(url.lastIndexOf('=') + 1));

  // Shows the previous pokemon
  $('.btnPrevious').click(function() {
    getId -= 1;
    getPokemon(getId);
  });

  // Shows the next pokemon
  $('.btnNext').click(function() {
    getId += 1;
    getPokemon(getId);
  });

  // Shows the pokemon that was clicked in index
  getPokemon(getId);
})();

// Get the details of the pokemon
function getPokemon(id)
{
  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/" + id
  }).done(handleResponse);

  function handleResponse(data)
  {
    $('#pokemonImg img').attr('src', data.sprites.front_default);
    $('#pokemonName span').html(data.name);
    $('#pokemonId span').html('#' + data.id);

    for(let i = 0; i < data.types.length; i++)
    {
      $('.type[data-id="'+ i +'"] span').html(data.types[i].type.name);
    }

    for(let i = 0; i < data.abilities.length; i++)
    {
      $('.abilities[data-id="'+ i +'"] span').html(data.abilities[i].ability.name);
    }

    for(let i = 0; i < data.stats.length; i++)
    {
      let statName = data.stats[i].stat.name;
      let statNameSlice = statName.slice(0, 2);
      let statNameSliceTwo = statName.slice(8, 11);

      $('.baseStats[data-id="'+ i +'"] span').html(data.stats[i].base_stat);

      if(statName.length >= 14)
      {
        $('.statName[data-id="'+ i +'"] span').html(statNameSlice + "." + statNameSliceTwo.replace('att', 'atk'));
      }
      else
      {
        $('.statName[data-id="'+ i +'"] span').html(data.stats[i].stat.name.replace('defense', 'def').replace('attack', 'atk'));
      }
    }
  }
}
