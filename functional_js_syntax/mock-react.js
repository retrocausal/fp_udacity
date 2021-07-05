const React = (function ReactDOM() {
  return {
    store: new WeakMap(),
    render(app, elementId) {
      React.store.set(app, { root: document.querySelector(`#${elementId}`) });
      React.store.get(app).root.innerHTML = "";
      React.store.get(app).root.appendChild(app());
      React.app = app;
    },
    async update() {
      const root = React.store.get(React.app).root;
      root.innerHTML = "";
      return root.appendChild(React.app());
    },
  };
})();

export const useReducer = (function buildReducer() {
  return function hookReducer(
    reducer = (state) => ({ ...state }),
    initialState = {}
  ) {
    let state, dispatch;
    if (React.store.has(reducer) === false) {
      state = JSON.parse(JSON.stringify(initialState));
      dispatch = async function (action = {}) {
        state = await new Promise((resolve) => resolve(reducer(state, action)));
        React.store.set(reducer, { state, dispatch });
        await React.update();
        return state;
      };
    } else {
      const reference = React.store.get(reducer);
      state = reference.state;
      dispatch = reference.dispatch;
    }
    return [dispatch, state];
  };
})();
export default React;
