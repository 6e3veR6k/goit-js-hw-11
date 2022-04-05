import icons from '../images/icons.svg';

export function createGalleryLayout(galleryData) {
  const galleryList = galleryData.map(imgData => createGalleryCardLayout(imgData));

  return galleryList.join('');
}

function createGalleryCardLayout({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  // webformatURL - ссылка на маленькое изображение для списка карточек.
  // largeImageURL - ссылка на большое изображение.
  // tags - строка с описанием изображения. Подойдет для атрибута alt.
  // likes - количество лайков.
  // views - количество просмотров.
  // comments - количество комментариев.
  // downloads - количество загрузок.

  return `<li class="gallery-item">
        <a class="photo-card" href="${largeImageURL}">
            <div class="card-img-wrapper">
                <img
                  src="${webformatURL}"
                  alt="${tags}"
                  loading="lazy"
                  width="320"
                />
            </div>

          <div class="info">
            <button class="button button-sm" type="button" data-likes="${likes}">
              <svg class="icon">
                <use class="likes-icon" href="${icons}#like"></use>
              </svg>
              <span class="img-info">${likes}</span>
            </button>

            <button class="button button-sm" type="button" data-views="${views}">
              <svg class="icon">
                <use class="views-icon" href="${icons}#view"></use>
              </svg>
              <span class="img-info">${views}</span>
            </button>

            <button class="button button-sm ml" type="button" data-comments="${comments}">
              <svg class="icon">
                <use class="comments-icon" href="${icons}#comment"></use>
              </svg>
              <span class="img-info">${comments}</span>
            </button>

            <button class="button button-sm" type="button" data-downloads="${downloads}">
              <svg class="icon">
                <use class="downloads-icon" href="${icons}#download"></use>
              </svg>
              <span class="img-info">${downloads}</span>
            </button>
          </div>
        </a>
      </li>`;
}
