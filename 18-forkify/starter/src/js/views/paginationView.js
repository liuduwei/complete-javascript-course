import View from './View';
import icon from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  //data //state.search
  _renderHtml() {
    const markup = this._generatorMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _generatorMarkup() {
    // only page 1
    const maxPage = Math.ceil(this._data.recipes.length / this._data.perPageNum);
    if (this._data.currentPage == 1 && maxPage == 1) {
      return ``;
    }
    // page 1 and other pages
    if (this._data.currentPage == 1 && maxPage != 1) {
      return `
          <button data-goto=${this._data.currentPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${this._data.currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
    // page last
    if (this._data.currentPage == maxPage) {
      return `
       <button data-goto=${this._data.currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.currentPage - 1}</span>
          </button> 
          `;
    }
    //  page other
    return `
          <button data-goto=${this._data.currentPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${this._data.currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </button>

       <button data-goto=${this._data.currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.currentPage - 1}</span>
          </button> 
      `;
  }

  pageinationHandler(handler) {
    this._parentEl.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');
      if(!btn) return;
      const pageGoTo = +btn.dataset.goto;
      handler(pageGoTo);
    })
  }

}

export default new PaginationView();
