import { BrowserRouter, Routes, Route } from "react-router-dom";
import JournalismSpectrum from "./Components/JournalismSpectrum";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes >
          <Route path={"/journalism-spectrum"} element={<JournalismSpectrum />} />
        </Routes >
      </BrowserRouter>
    </div>
  );
}

export default App;
