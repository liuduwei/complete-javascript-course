import View from './View';

class addRecipeView extends View {
  _parentEl = document.querySelector('.upload');

  _overlay = document.querySelector('.overlay');

  _btnClose = document.querySelector('.btn--close-modal');

  _btnOpen = document.querySelector('.nav__btn--add-recipe');

  _addRecipeWindow = document.querySelector('.add-recipe-window');

  _message = 'upload success';

  constructor() {
    super();
    this._OpenAddWindowHandler();
    this._closeAddWindowHandler();
  }

  _getMarkupHtml() {
    return `
     <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="TEST123" required name="title" type="text" />
          <label>URL</label>
          <input value="TEST123" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="TEST123" required name="image" type="text" />
          <label>Publisher</label>
          <input value="TEST123" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="23" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="23" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="1,,Avocado"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=",,salt"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="src/img/icons.svg#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
    `;
  }

  toggleHidden() {
    this._overlay.classList.toggle('hidden');
    this._addRecipeWindow.classList.toggle('hidden');
  }

  _OpenAddWindowHandler() {
    this._btnOpen.addEventListener('click', this.toggleHidden.bind(this));
  }

  _closeAddWindowHandler() {
    this._btnClose.addEventListener('click', this.toggleHidden.bind(this));
    this._overlay.addEventListener('click', this.toggleHidden.bind(this));
  }

  addRecipeHandler(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataForm = [...new FormData(this)];
      const dataRecipe = Object.fromEntries(dataForm);
      handler(dataRecipe);
    });
  }
}

export default new addRecipeView();
