import { getImages, createPath } from './js/data-service';
import { createGalleryLayout } from './js/gallery';
import { InfiniteScroll } from './js/infinite-scroll';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import 'modern-normalize/modern-normalize.css';
import './sass/main.scss';

const ref = {
  searchForm: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};

let options = {
  searchText: '',
  pageNumber: 1,
  imgPerRow: 4,
  rows: 12,
  imgPerPage() {
    return this.imgPerRow * this.rows;
  },
  simplelightbox: {
    overlayOpacity: 1,
    captions: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  },
};

ref.searchForm.addEventListener('submit', onSearchButtonClick);

const lightbox = new SimpleLightbox('.gallery a', options.simplelightbox);

async function onSearchButtonClick(e) {
  e.preventDefault();
  ref.gallery.innerHTML = '';
  const searchText = ref.searchForm.elements.searchQuery.value;
  if (!searchText) return;

  options = { ...options, ...{ searchText, pageNumber: 1 } };

  await processGallery(options.searchText, options.pageNumber, options.imgPerPage());
}

async function processGallery(searchText, pageNumber, imgPerPage) {
  const responseObj = await getImages(searchText, pageNumber, imgPerPage);
  const imgData = await responseObj.hits;

  if (hasItemsInCollection(imgData)) {
    if (pageNumber === 1) {
      Notify.info(`Hooray! We found ${responseObj.totalHits} images.`);
    }
    renderLayout(imgData);
    addSmoothScroll();
    lightbox.refresh();
  } else {
    Notify.failure("We're sorry, but you've reached the end of search results.");
  }
}

function renderLayout(imgData) {
  const layout = createGalleryLayout(imgData);
  ref.gallery.insertAdjacentHTML('beforeend', layout);

  const infScroll = new InfiniteScroll(ref.gallery.lastChild, renderCards);
}

function hasItemsInCollection(imgData) {
  return imgData.length > 0;
}

window.addEventListener('scroll', () => console.log(document.documentElement.scrollTop));

function addSmoothScroll() {
  const { height: cardHeight } = ref.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({ top: cardHeight * (options.rows - 3), behavior: 'smooth' });
}

async function renderCards(elements) {
  let { searchText, pageNumber, imgPerPage } = options;

  if (elements[0].isIntersecting) {
    pageNumber += 1;
    const responseObj = await getImages(searchText, pageNumber, imgPerPage);
    const imgData = await responseObj.hits;

    if (hasItemsInCollection(imgData)) {
      renderLayout(imgData);
      lightbox.refresh();
    } else {
      Notify.failure("We're sorry, but you've reached the end of search results.");
    }
  }
}
