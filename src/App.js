import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Details from './components/Details';
import Creation from './components/Creation';
import About from './components/About';
import { useSelector } from 'react-redux';

function App() {
  const types = useSelector((state) => state.types)

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/home/:id' render={ ({match}) => <Details id={match.params.id}/> }/>
        <Route exact path='/create' component={Creation}/>
        <Route exact path='/about' component={About}/>
        <Route path='/' render={() => <h1>Ruta no encontrada</h1>}/>
      </Switch>
    </div>   
  );
}

export default App;
