# redux-star

Redux star allows you to use ES7 generators in your redux action creators. This gives you more
flexibility to add async business logic and build complex action creators or even graphs of action
creators.

## Example
```js
const ActionTypes = {
  GET_PAGE_START: 'GET_PAGE_START',
  GET_PAGE_END: 'GET_PAGE_END',
};

const ActionCreators = {
  // Action creators can be regular generators...
  getPageStart: function* () {
    yield { type: ActionTypes.GET_PAGE_START };
    // could have more yields in here too
  },

  // ...plain actions...
  getPageEnd({ articles, success }) {
    return {
      type: ActionTypes.GET_PAGE_END,
      articles,
      success
    }
  },

  // ...or async generators
  triggerGetPage: async function* () {
    yield ActionCreators.getPageStart();

    try {
      let articles = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      articles = await articles.json();

      yield ActionCreators.getPageEnd({ articles, success: true });
    } catch (e) {
      yield ActionCreators.getPageEnd({ success: false });
    }
  },
};
```

That's it! Now you can use async/await easily, and remove the need to be returning functions from
your action creators (like in redux-thunk).

## Configuration

```
npm install redux-star
```

Note: you'll need the Babel `stage-1` preset for generator support for redux-star to work. As of
writing, you will also need the `babel-polyfill` to get support in some browsers.

Now add the middleware to your redux store config:

```
import starMiddleware from 'redux-star';

const store = createStore(
  Reducer,
  compose(
    applyMiddleware(starMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
```
