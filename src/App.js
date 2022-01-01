import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import Vaccination from './components/Vaccination'
import About from './components/About'
import SpecificStateItem from './components/SpecificStateItem'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/vaccination" component={Vaccination} />
    <Route exact path="/about" component={About} />
    <Route exact path="/state/:stateCode" component={SpecificStateItem} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
