
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ROUTES } from './helpers/RoutesPath'
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import CreatePokemon from './Components/CreatePokemon/CreatePokemon';
import Detail from './Components/Detail/Detail';
import NotFoundPage from './Components/NotFound/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    
      <Routes>
      <Route exact path={ROUTES.LANDING} element={<LandingPage/>} />
      <Route exact path={ROUTES.HOME}  element={<Home/>}/>
      <Route exact path={ROUTES.CREATE}  element={<CreatePokemon/>}/>
      <Route exact path={ROUTES.DETAIL}  element={<Detail/>}/>
      <Route path={ROUTES.ERROR} element={<NotFoundPage/>}/>
      </Routes>
    </div>
    </BrowserRouter>
   )
}


export default App;
