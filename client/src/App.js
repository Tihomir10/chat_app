import { 
  Router,
  Switch,
  Route
 } from 'react-router-dom'
import { history } from './history'

import { RegistrationForm } from './features/user/RegistartionForm'
import { LoginForm } from './features/user/LoginForm'

import { ActiveUsers } from './features/listOfUsers/ActiveUsers'


function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={RegistrationForm}/>
        <Route exact path='/login' component={LoginForm}/>
        <Route exact path='/chat' component={ActiveUsers} />
      </Switch>
    </Router>
  )
}

export default App;