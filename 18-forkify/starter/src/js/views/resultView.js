import icon from '../../img/icons.svg';
import View from './View';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  // render(data) {
  //   this._data = data;
  //   const markup = this._getMarkupHtml();
  //   this._clear();
  //   this._parentEl.insertAdjacentHTML('afterbegin', markup);
  // }

  _getMarkupHtml() {
    return this._data
      .map(i => {
        const id = window.location.hash.slice(1);
        return `
          <li class="preview">
            <a class="preview__link ${
              i.id == id ? 'preview__link--active' : ''
            }" href="#${i.id}">
              <figure class="preview__fig">
                <img crossorigin="anonymous" src="${i.image_url}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${i.title}</h4>
                <p class="preview__publisher">${i.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icon}icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
    `;
      })
      .join('');
  }
}

export default new ResultView();
