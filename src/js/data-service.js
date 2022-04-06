import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '26514918-51b3293439e1c4834d5cf3fc1';

export async function getImages(searchText, pageNumber, imgPerPage) {
  return axiosGETService(searchText, pageNumber, imgPerPage);
}

async function defaultHTTPGetService(searchText, pageNumber, imgPerPage) {
  const path = createPath(searchText, pageNumber, imgPerPage);
  const response = await fetch(path);
  const responseObject = await response.json();
  return responseObject;
}

export function createPath(searchText, pageNumber, imgPerPage) {
  // key - твой уникальный ключ доступа к API.
  // q - термин для поиска. То, что будет вводить пользователь.
  // image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
  // orientation - ориентация фотографии. Задай значение horizontal.
  // safesearch - фильтр по возрасту. Задай значение true.

  const queryObject = new URLSearchParams({
    key: API_KEY,
    q: searchText,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: pageNumber,
    per_page: imgPerPage,
  });

  return `${BASE_URL}?${queryObject}`;
}

async function axiosGETService(searchText, pageNumber, imgPerPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '26514918-51b3293439e1c4834d5cf3fc1';

  const queryText = createPath(searchText, pageNumber, imgPerPage);
  const response = await axios.get(queryText);

  return response.data;
}
