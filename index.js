function reduxStarMiddleware({ dispatch, getState }) {
  return function(next) {
    return async function (action) {
      // If it's an async generator, await for each yield and dispatch
      if (Symbol.asyncIterator in action) {
        for await (let a of action) {
          dispatch(a);
        }

        return;
      }

      // If it's a regular generator, get each yield and dispatch
      if (Symbol.iterator in action) {
        for (let a of action) {
          dispatch(a);
        }

        return;
      }

      // If it's a regular action, continue
      return next(action);
    }
  }
}

export default reduxStarMiddleware;
