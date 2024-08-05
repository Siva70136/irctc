import { Route, Routes, BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Bookings from './components/Bookings';
import Login from './components/Login';
import Register from './components/Register';
import Trains from './components/Trains';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/" element={<Bookings />} />
        <Route exact path="/train" element={<Trains />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;