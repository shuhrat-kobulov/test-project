import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './providers/auth';
import { AppRouter } from './providers/router';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
