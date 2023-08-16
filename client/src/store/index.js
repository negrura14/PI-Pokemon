import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../reducer/index';

//* Configura y crea una tienda Redux con el middleware y las herramientas de desarrollo
 
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));