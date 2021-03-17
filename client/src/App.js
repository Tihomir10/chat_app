import { 
  Router,
  Switch,
  Route
 } from 'react-router-dom'
import { history } from './history'

import { RegistrationForm } from './features/user/RegistartionForm'
import { LoginForm } from './features/user/LoginForm'

import { ActiveUsers } from './features/listOfUsers/ActiveUsers'

import { Chat } from './features/chat/Chat'


function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/register' component={RegistrationForm}/>
        <Route exact path='/' component={LoginForm}/>
        <Route exact path={['/chat', '/chat/:id']} component={Chat} />
      </Switch>
    </Router>
  )
}

export default App;