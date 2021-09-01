import './App.css';
import logo from './logo@2x.png';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from './store';
import SharedContext from './context';
import GlobalContextProvider from './context/GlobalContextProvider';
import PostList from './containers/PostList';
import LoginForm from './components/LoginForm';

const { persistor, store } = configureStore()

function App() {
  return (
    <GlobalContextProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="AutoFi Logo" />
            </header>
            <SharedContext.Consumer>
              {({ user }) => (
                !user.name || !user.email ?
                <LoginForm />
                :
                <PostList />
              )}
            </SharedContext.Consumer>
          </div>
        </PersistGate>
      </Provider>
    </GlobalContextProvider>
  );
}

export default App;
