import { API_URL, KEY, PERPAGE_NUM } from "./config";
import { getJson, sendJson } from "./helper";

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

const createRecipeObject = function(newRecipe) {
  return {
      id: newRecipe.id,
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      sourceUrl: newRecipe.source_url,
      image: newRecipe.image_url,
      servings: newRecipe.servings,
      cookingTime: newRecipe.cooking_time,
      ingredients: newRecipe.ingredients,
      ...(newRecipe.key && {key:newRecipe.key})
  }
}

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = createRecipeObject(recipe);

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

export const uploadRecipe = async function(newRecipe) {
  try {
  const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
  .map(ing => {
    if (ing[1].length < 3) {
      throw Error('invalid input, use format: ,,,');
    }
    const ingredient = ing[1].replaceAll(' ', '').split(',');
    const [quantity, unit, description] = ingredient;
    return {quantity : quantity ? +quantity : null, 
    unit : unit ? +unit : null ,
    description};
  });
  const uploadData = {
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    servings: +newRecipe.servings,
    source_url: newRecipe.sourceUrl,
    title: newRecipe.title,
    cooking_time: newRecipe.cookingTime,
    ingredients
  }
  const {data} = await sendJson(`${API_URL}?key=${KEY}`,uploadData);
  state.recipe = createRecipeObject(data.recipe);
  addBookmark(state.recipe)
  console.log(state.recipe);
  } catch(e) {
    throw e;
  }
}
