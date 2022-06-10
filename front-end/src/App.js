import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ChatApp from './components/ChatApp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<ChatApp />} />

      </Routes>
    </div>
  );
}

export default App;
/*
        <Route path='/messages' element={< />} />
        <Route path='/lngMessages' element={< />} />
*/