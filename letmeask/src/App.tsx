import { Switch, Route } from 'react-router-dom';
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/rooms/new" component={ NewRoom }/>
      <NewRoom />

    </Switch>
  );
}

export default App;
