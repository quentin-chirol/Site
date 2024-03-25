import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Index from './pages/index';
import Watch from './pages/watch';

const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<Index />}></Route>
                <Route path="/Watch" element={<Watch />}></Route>
            </Routes>
        </BrowserRouter>    
    );
}

export default App;