import { BrowserRouter, Routes, Route } from "react-router-dom";
import JournalismSpectrumQuiz from "./Pages/JournalismSpectrumQuiz";
import JournalismSpectrumResults from "./Pages/JournalismSpectrumResults";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes >
          <Route path={"/journalism-spectrum/takequiz"} element={<JournalismSpectrumQuiz />} />
          <Route path={"/journalism-spectrum"} element={<JournalismSpectrumResults />} />
        </Routes >
      </BrowserRouter>
    </div>
  );
}

export default App;
