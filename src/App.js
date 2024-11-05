import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import JoinRoom from './joinRoom';
import CreateRoom from './createRoom';
import Room from './Room';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/joinroom" element={<JoinRoom />} />
          <Route path="/createroom" element={<CreateRoom />} />
          <Route path="/room/:roomId" element={<Room/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
