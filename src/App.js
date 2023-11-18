import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import { AutoComplete, TextMetrics } from "./challenges";
import { Home } from "./pages";


function App() {
  return (
    <Router>
      <div className="light">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/challenges/auto-complete" element={<AutoComplete />} />
          <Route exact path="/challenges/text-metrics" element={<TextMetrics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
