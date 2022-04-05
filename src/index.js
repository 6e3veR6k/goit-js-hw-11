import { getImages, createPath } from './js/data-service';
import { createGalleryLayout } from './js/gallery';

import 'modern-normalize/modern-normalize.css';
import './sass/main.scss';

const ref = {
  searchForm: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};

const options = {
  searchText: '',
  pageNumber: 1,
  imgPerPage: 12,
};

ref.searchForm.addEventListener('submit', onSearchButtonClick);

async function onSearchButtonClick(e) {
  e.preventDefault();
  ref.gallery.innerHTML = '';
  options.searchText = ref.searchForm.elements.searchQuery.value;


  const imgData = await getImagesData(options.searchText, options.pageNumber, options.imgPerPage);
  renderLayout(imgData);
}

async function getImagesData(searchText, pageNumber, imgPerPage) {
  const responseObj = await getImages(searchText, pageNumber, imgPerPage);
  const imgData = await responseObj.hits;
  return imgData;
}

function renderLayout(imgData) {
  const layout = createGalleryLayout(imgData);
  ref.gallery.insertAdjacentHTML('beforeend', layout);
}

const infScroll = new InfiniteScroll(ref.gallery, {
  // options
  path: function () {
    return createPath(options.searchText, this.pageIndex, options.imgPerPage);
  },
  append: '.gallery-item',
  responseBody: 'json',
  history: false,
});


infScroll.on('load', function(body) {
  
});
