import View from './View';
import icon from 'url:../../img/icons.svg';
class ResultView extends View {
  _parentEl = document.querySelector('.results');
  render(data) {
    this._data = data;
    this._renderHtml();
  }

  _renderHtml() {
    const markup = this._data.map(function (i) {
      const markup = `
          <li class="preview">
            <a class="preview__link preview__link--active" href="#${i.id}">
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
    return markup;
    }).join('');
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new ResultView();
