import { render, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import App from './App.js';
import {createMemoryHistory} from 'history';
import rootReducer from './reducer/reducer.js'
import { Provider } from 'react-redux'
import { createStore } from 'redux';

afterEach(cleanup)

function renderWithRedux(
  ui,
  {initialState, store = createStore(rootReducer, initialState)} = {}
){
  const history = createMemoryHistory()
  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>{ui}</Provider>
      </Router>
    )
  }
}
describe('Front End Tests:', () => {
  console.log('IMPORTANTE: Comentar dispatchs dentro de useEffects para que no se ejecuten')
  let getByTestId = null
  let getByText = null
  beforeEach(() => {
    const scrn = renderWithRedux(<App/>)
    getByTestId = scrn.getByTestId
    getByText = scrn.getByText
  }) 

  describe('Landing Page', () => {

    it(`La ruta '/' debe comenzar en la LandingPage`, () => {
      expect(getByTestId('empezar')).toHaveTextContent('Empezar')
    })
    it('El boton Empezar debe redirigir a /home', () => {
      fireEvent.click(getByTestId('empezar'))
      expect(getByText('Cargando...')).toBeInTheDocument()
    })
  }) 
  describe('Home Page', () => {
    beforeEach(() => {fireEvent.click(getByTestId('empezar'))})
    it(`El componente home se debe renderizarr en la ruta '/home'`, () => {
      expect(getByText('Cargando...')).toBeInTheDocument()
    })
    it(`El boton Crear Pokemon debe redirigir a /create`, () => {
      fireEvent.click(getByText('+ Crear Pokemon'))
      expect(getByText('Create')).toBeInTheDocument()
    })
  }) 
  describe('About Page', () => {
    beforeEach(() => {fireEvent.click(getByTestId('empezar'))})
    it(`El componente About se debe renderizarr en la ruta '/about'`, () => {
      fireEvent.click(getByTestId('About'))
      expect(getByText('About Me')).toBeInTheDocument()
    })
  }) 

  
  describe('NavBar test', () => {
    beforeEach(() => {fireEvent.click(getByTestId('empezar'))})
    it('Debe tener un titulo', () => {
      expect(getByText('PikaBoss')).toBeInTheDocument()
    })
    it('Debe tener un input de busqueda', () => {
      expect(getByTestId('searchBar')).toBeInTheDocument()
    })
  }) 
})


