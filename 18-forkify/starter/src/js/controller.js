import * as model from './model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView.js';
import ResultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import resultView from './views/resultView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MOADL_ESC_SEC } from './config.js';
import '../sass/main.scss';

/// ////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderLoding();
    // get Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    // render page
    // update result view
    resultView.update(model.getRenderPage());
    bookmarkView.update(model.state.bookmarks);
    recipeView.render(recipe);
  } catch (e) {
    console.error(`${e} 😣😣😣`);
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    ResultView.renderLoding();
    const query = searchView.getQuery();
    await model.loadSearch(query);
    ResultView.render(model.getRenderPage());
    paginationView.render(model.state.search);
  } catch (e) {
    console.error(`${e} 😣😣😣`);
    ResultView.renderError(e);
  }
};

const controlPage = function (pageGoTo) {
  ResultView.render(model.getRenderPage(pageGoTo));
  paginationView.render(model.state.search);
};

const controlServings = function (serving) {
  model.updateServing(serving);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const controlLoadBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controladdRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderLoding();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    bookmarkView.render(model.state.bookmarks);
    addRecipeView.renderMessage();
    setTimeout(() => {
      addRecipeView.toggleHidden();
      addRecipeView.render();
    }, MOADL_ESC_SEC * 1000);
  } catch (e) {
    console.error(e.message);
    addRecipeView.renderError(e.message);
  }
};

const init = function () {
  bookmarkView.bookmarkHandler(controlLoadBookmark);
  recipeView.recipeHandler(controlRecipes);
  searchView.searchHandler(controlSearch);
  paginationView.pageinationHandler(controlPage);
  recipeView.servingHandler(controlServings);
  recipeView.bookmarkHandler(controlBookmark);
  addRecipeView.addRecipeHandler(controladdRecipe);
};
init();
