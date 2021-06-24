import { Switch, Route } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/rooms/new" component={ NewRoom } />
      <Route path="/rooms/:id" component={ Room } />
    </Switch>
  );
}

export default App;
