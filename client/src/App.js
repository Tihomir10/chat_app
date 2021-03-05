import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
 } from 'react-router-dom'

import { RegistrationForm } from './features/user/RegistartionForm'
import { LoginForm } from './features/user/LoginForm'


function App() {
  return (
    <Router>
      <div>
        <Link to='/login'>
          Login
        </Link>
      </div>
      <div>
        <Link to='/'>
          Register
        </Link>
      </div>
      <Switch>
        <Route exact path='/'>
          <RegistrationForm />
        </Route>
        <Route exact path='/login'>
          <LoginForm />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;