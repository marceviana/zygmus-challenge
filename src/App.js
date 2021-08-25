import logo from './logo.webp';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import PostList from './containers/PostList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <PostList />
      </div>
    </Provider>
  );
}

export default App;
