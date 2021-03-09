import { 
  Router,
  Switch,
  Route
 } from 'react-router-dom'
import { history } from './history'
import { RegistrationForm } from './features/user/RegistartionForm'
import { LoginForm } from './features/user/LoginForm'


function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={RegistrationForm}/>
        <Route exact path='/login' component={LoginForm}/>
      </Switch>
    </Router>
  )
}

export default App;