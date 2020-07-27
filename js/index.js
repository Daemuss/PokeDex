
let nextUrl;
let previousUrl;
let imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

(function () {
  // Shows the previous list of pokemon
  $('.btnPrevious').click(function() {
    if(previousUrl != null)
    {
      pokemonList(previousUrl);
    }
    else
    {
      alert("Can't catch pokemon that aren't there!")
    }
  });

  // Shows the next list of pokemon
  $('.btnNext').click(function() {
    pokemonList(nextUrl);
  });

  // Shows first list of pokemon
  pokemonList("https://pokeapi.co/api/v2/pokemon");

  wow("http://localhost:7000/api/temp-sensor");
})();

// Function to get a list of pokemon
function pokemonList(url)
{
  $.ajax({
    url: url
  }).done(handleResponse);

  function handleResponse(data)
  {
    for(let i = 0; i < 20; i++)
    {
      id = data.results[i].url.split("/");
      id = id[id.length - 2];

      $('.pokemonCard[data-id="'+ i +'"] span').html(id + ". " + data.results[i].name);
      $('.pokemonCard[data-id="'+ i +'"] img').attr('src', imageUrl + id + '.png');
      $('.pokemonCard[data-id="'+ i +'"] a').attr('href', 'detailpage.html?id=' + id);
    }

    nextUrl = data.next;
    previousUrl = data.previous;
  }
}

function wow(url)
{
  $.ajax({
    url: url
  }).done(handleResponse);

  function handleResponse(data)
  {
    console.log(data);
  }
}
