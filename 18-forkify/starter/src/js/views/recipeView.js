import icon from '../../img/icons.svg';
import View from './View';

class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');

  _data;

  _messageError = "Sorry con't get";

  recipeHandler(handler) {
    ['hashchange', 'load'].forEach(el => window.addEventListener(el, handler));
  }

  servingHandler(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (Number(updateTo) > 0) handler(Number(updateTo));
    });
  }

  bookmarkHandler(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  render(data) {
    this._data = data;
    const markup = this._getMarkupHtml();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _getMarkupHtml() {
    return `
        <figure class="recipe__fig">
          <img crossorigin="anonymous" src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icon}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icon}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to=${
                this._data.servings - 1
              }>
                <svg>
                  <use href="${icon}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to=${
                this._data.servings + 1
              }>
                <svg>
                  <use href="${icon}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icon}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icon}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._getMarkupRecipeIngredient()}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }

  _getMarkupRecipeIngredient() {
    return this._data.ingredients
      .map(
        i => `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${icon}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${i.quantity}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${i.unit}</span>
                    ${i.description}
                  </div>
                </li>
            `
      )
      .join('');
  }
}

export default new RecipeView();
