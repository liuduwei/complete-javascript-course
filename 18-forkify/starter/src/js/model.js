import { API_URL, PERPAGE_NUM } from "./config";
import { getJson } from "./helper";

export const state = {
  recipe: {},
  search: {
    query: '',
    recipes: {},
    currentPage: 0,
    perPageNum: PERPAGE_NUM,
    maxPage: 0
  }
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (e) {
    throw e;
  }
};

export const loadSearch = async function(query) {
  try {
    state.search.query = query;
    const data = await getJson(`${API_URL}?search=${query}`);
    if(data.data.recipes.length === 0) throw Error('change key word');
    state.search.recipes = data.data.recipes;
  } catch (e) {
    throw e;
  }
}

export const getRenderPage = function(page = 1) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.perPageNum; // 0
  const end = page * state.search.perPageNum; // 9
  return state.search.recipes.slice(start, end);
}
