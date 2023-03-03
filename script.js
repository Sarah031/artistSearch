function init() {
  const search = document.getElementById("search");
  const button = document.getElementById("searchButton");
  const result = document.getElementById("search-result");
  const form = document.getElementById("form");
  button.addEventListener("click", (ev) => handleSubmit(ev));

  const handleSubmit = (ev) => {
    ev.preventDefault();

    let searchValue = search.value.trim();
    if (!searchValue) {
      alert("Molim upišite ime glazbenika u tražilicu!");
    } else {
      getArtist(searchValue);
    }

    form.reset();
  };

  async function getArtist(searchValue) {
    let Api = `https://itunes.apple.com/search?entity=allArtist&attribute=allArtistTerm&term=${searchValue}`;
    try {
      let SearchResult = await fetch(Api);
      let artists = await SearchResult.json();
      displayArtist(artists);
    } catch (error) {
      console.error(error);
    }
  }

  // console.log(artists);
  // console.log(artists.results);

  const displayArtist = (artists) => {
    result.innerHTML = `<ul class="artistName">
       ${artists.results
         .map(
           (el) => `<li>
         <span class="name">
         Artist name: ${el.artistName} genre: ${el.primaryGenreName}</span>
         </li>`
         )
         .join("")}
       </p>`;
  };
}
init();
