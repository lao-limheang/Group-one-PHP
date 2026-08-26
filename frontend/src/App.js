import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Login from './pages/login';
import HeaderBar from './components/Header';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderBar className='' />
      </header>
  <div className='flex '>
    <Navbar />
    <Dashboard />
  </div>
    </div>
  );
}

export default App;