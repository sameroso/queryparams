import { BrowserRouter, Route } from "react-router-dom";

// Routes
import { Home, Cart } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/cart" exact component={Cart} />
    </BrowserRouter>
  );
}

export default App;
