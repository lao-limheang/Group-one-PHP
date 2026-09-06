import './App.css';
import Navbar from './components/Navbar';
import HeaderBar from './components/HeaderBar';
import Dashboard from './pages/Dashboard';

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
