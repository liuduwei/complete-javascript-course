import icon from 'url:../../img/icons.svg';
export default class View {
  _parentEl;
  _data;

  render(data) {
    this._data = data;
    const markup = this._getMarkupHtml();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    // console.log(this._data);
    const newMarkup = this._getMarkupHtml();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    const currentElement = Array.from(this._parentEl.querySelectorAll('*'));

    newElement.forEach(function(newEl, i) {
      const curEl = currentElement[i]; // console.log(curEl, newEl.isEqualNode(curEl));
      // console.dir(newEl);
      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent
      }

      if(!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(function(el) {
          curEl.setAttribute(el.name, el.value);
        });
      }
    })
  }

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

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
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

  };
}