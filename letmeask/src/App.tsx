import { Switch, Route } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/rooms/new" component={ NewRoom }/>
      <Route path="/rooms/:id" component={ Room }/>
      <NewRoom />
    </Switch>
  );
}

export default App;
