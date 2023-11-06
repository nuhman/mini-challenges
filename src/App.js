import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { AutoComplete } from "./challenges";
import { Home } from "./pages";


function App() {
  return (
    <Router>
      <div className="light">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/challenges/auto-complete" element={<AutoComplete />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
