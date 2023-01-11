import { API_URL, PERPAGE_NUM } from "./config";
import { getJson } from "./helper";

export const state = {
  recipe: {},
  search: {
    query: '',
    recipes: [],
    currentPage: 1,
    perPageNum: PERPAGE_NUM,
    maxPage: 0
  },
  bookmarks: []
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

    if (state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true;
  } catch (e) {
    throw e;
  } }

export const loadSearch = async function(query) {
  try {
    state.search.query = query;
    const data = await getJson(`${API_URL}?search=${query}`);
    if(data.data.recipes.length === 0) throw Error('change key word');
    state.search.recipes = data.data.recipes;
    state.search.currentPage = 1;
  } catch (e) {
    throw e;
  }
}

export const getRenderPage = function(page = state.search.currentPage) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.perPageNum; // 0
  const end = page * state.search.perPageNum; // 9
  return state.search.recipes.slice(start, end);
}

export const updateServing = function(newServing) {
  state.recipe.ingredients.forEach(function(el) {
    el.quantity = (el.quantity / state.recipe.servings) * newServing;
  });
  state.recipe.servings = newServing;
}

export const presistBookmarks = function() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function(recipe) {
  // 0) push bookmark
  state.bookmarks.push(recipe);

  // 1) set bookmarked to true
  state.recipe.bookmarked = true;

  presistBookmarks()
}

export const deleteBookmark = function(id) {
  const index = state.bookmarks.findIndex(d => d.id ===id);
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;

  presistBookmarks()
}

const init = function() {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
}
init();

const clearLocalstorage = function() {
  localStorage.removeItem('bookmarks');
}
// clearLocalstorage();
