
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../src/Context/Usercontext';

// Your theme object



createRoot(document.getElementById('root')).render(
  <UserProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </UserProvider>
);
