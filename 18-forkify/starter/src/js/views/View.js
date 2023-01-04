import icon from 'url:../../img/icons.svg';
export default class View {
  _parentEl;
  _data;

  render(data) {
    this._data = data;
    this._renderHtml();
  }

  _renderHtml(){};

  renderLoding() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icon}#icon-loader"></use>
          </svg>
        </div>
`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._messageError) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icon}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSuccess() {};
}

