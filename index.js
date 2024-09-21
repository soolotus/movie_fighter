createAutoComplete({
  root: document.querySelector(".autocomplete"),
  renderOption: (movie) => {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    return `
    <img src="${imgSrc}"/>
    ${movie.Title} (${movie.Year})
    `;
  },
  onOptionSelect: (movie) => {
    onMovieSelect(movie);
  },
  inputValue: (movie) => {
    return movie.Title;
  },
  fetchData: async (searchTerm) => {
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: "ab4824f3",
        s: searchTerm,
      },
    });
    if (response.data.Error) {
      return [];
    }
    return response.data.Search;
  },
});

const onMovieSelect = async (movie) => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "ab4824f3",
      i: movie.imdbID,
    },
  });
  document.querySelector("#summary").innerHTML = MovieTemplate(response.data);
};

const MovieTemplate = (movieDetail) => {
  return `
    <article class="media">
    <figure class="media-left">
    <p class="image">
    <img src="${movieDetail.Poster}"/>
    </p>
    </figure>
    <div class="media-content">
    <div class="content">
    <h1>${movieDetail.Title}</h1>
    <h4>${movieDetail.Genre}</h4>
    <p>${movieDetail.Plot}</p>
    </div>
    </div>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.BoxOffices}</p>
    <p class="subtitle">Box Offices</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
    </article>
    `;
};
