import { BrowserRouter, Routes, Route } from "react-router-dom";
import JournalismSpectrum from "./Pages/JournalismSpectrum";
import ResultsPage from "./Pages/LandingPage";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes >
          <Route path={"/journalism-spectrum/takequiz"} element={<JournalismSpectrum />} />
          <Route path={"/journalism-spectrum"} element={<ResultsPage />} />
        </Routes >
      </BrowserRouter>
    </div>
  );
}

export default App;
