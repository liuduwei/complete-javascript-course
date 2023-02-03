import View from "./View";
class searchView extends View{
  _parentEl = document.querySelector('.search');
  
  _clear() {
    this._parentEl.querySelector('input').value = '';
  }

  getQuery() {
    const query = this._parentEl.querySelector('input').value;
    this._clear();
    return query;
  }

  searchHandler(handler) {
    this._parentEl.addEventListener('submit', function(e) {
      e.preventDefault();
      handler();
    })
  }
}

export default new searchView();