import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <Home />
      <header className="App-header">
        <Navbar />
      </header>
    </div>
  );
}

export default App;