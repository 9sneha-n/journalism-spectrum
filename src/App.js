import { BrowserRouter, Routes, Route } from "react-router-dom";
import JournalismSpectrum from "./Pages/JournalismSpectrum";
import ResultsPage from "./Pages/Results";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes >
          <Route path={"/journalism-spectrum"} element={<JournalismSpectrum />} />
          <Route path={"/journalism-spectrum/results"} element={<ResultsPage />} />
        </Routes >
      </BrowserRouter>
    </div>
  );
}

export default App;
