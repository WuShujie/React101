import React from 'react';
import { render, waitForElement, fireEvent, getByRole } from '@testing-library/react';
import App from './App';
import reducers from './reducers/index'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

test('renders Hello World on page', async () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>);
  const linkElement = getByText(/Hello World/i);
  expect(linkElement).toBeInTheDocument();
});
