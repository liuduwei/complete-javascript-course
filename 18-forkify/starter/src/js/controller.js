import * as model from '../js/model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView.js';
import ResultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderLoding();
    // get Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    //render page
    recipeView.render(recipe);
  } catch (e) {
    console.error(`${e} 😣😣😣`);
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try{
  ResultView.renderLoding();
  const query = searchView.getQuery();
  await model.loadSearch(query);
  ResultView.render(model.getRenderPage(1));
  paginationView.render(model.state.search);
  } catch(e) {
    console.error(`${e} 😣😣😣`);
    ResultView.renderError(e)
  }
};

const controlPage = function(pageGoTo) {
  ResultView.render(model.getRenderPage(pageGoTo));
  paginationView.render(model.state.search);
}

const init = function () {
  recipeView.recipeHandler(controlRecipes);
  searchView.searchHandler(controlSearch);
  paginationView.pageinationHandler(controlPage);
};
init();





