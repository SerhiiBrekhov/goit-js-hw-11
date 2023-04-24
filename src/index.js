const axios = require('axios').default
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описаний в документації

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "../node_modules/simplelightbox/dist/simple-lightbox.min.css";

 new SimpleLightbox('.gallery a', {captionDelay: 500,
    doubleTapZoom: 1.3, rtl: true
  });

        const searchForm = document.querySelector(".search-form");
        const gallerySection = document.querySelector(".gallery");
        const loadMore = document.querySelector('.load-more');
        let requestSearch = "";

const parameters = {
  API_KEY: '30227573-27b3490869524616035f18b3c',
    page: 1,
  per_page: 40,
  safesearch: true,
};

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const {
    elements: { searchQuery }
  } = event.currentTarget;
    requestSearch = searchQuery.value;
    console.log(requestSearch);
  runSearch(requestSearch).then(res => screenPhoto(res));
  // { hits: [], total: number, totalHit: number }
});

// var API_KEY = '30227573-27b3490869524616035f18b3c';
// var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });

function runSearch(requestSearch) {
  const URL = `https://pixabay.com/api/?key=${parameters.API_KEY}&q=${requestSearch}&page=${parameters.page}&per_page=${parameters.per_page}&safesearch=${parameters.safesearch}&image_type=image_type&orientation=horizontal`;
  return axios.get(URL, parameters).then(r => {
    parameters.page += 1;
    const galleryItems = r.data
    return galleryItems;
  });
};

function screenPhoto(galleryItems) {
 const { hits: photos, total, totalHits } =  galleryItems;
  if (photos.length === 0) {
    console.log(photos.length);
    Notify.info("Sorry, there are no images matching your search query. Please try again.", {
    timeout: 3000,});
    return;
  }
    Notify.info(`Hooray! We found ${totalHits} images.`, {timeout: 3000,});
  // debugger
  // console.log(photos);
  const galleryInserted = makeInsertPhoto(photos);
  gallerySection.insertAdjacentHTML('beforeend', galleryInserted);
}

function makeInsertPhoto(photos) {
  return photos.map((card) => {
    return `<div class="photo-card">
  <a href= "${card.largeImageURL}"> <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${card.likes}
    </p>
    <p class="info-item">${card.views}
      <b>Views</b>
    </p>
    <p class="info-item">${card.comments}
      <b>Comments</b>
    </p>
    <p class="info-item">${card.downloads}
      <b>Downloads</b>
    </p>
  </div>
</div>`
  }).join("");
  // debugger
}

// gallerySection.addEventListener('click', openModal);


