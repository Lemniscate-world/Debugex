import React, { useState } from 'react'
import { executeRegexStepByStep } from './RegexExecution';
import './App.css'
import { explainRegex } from './Explanation';

const App: React.FC = () => {
  const [regex, setRegex] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [matches, setMatches] = useState<string[]>([]);
  const [currentStep, SetCurrentStep] = useState<number>(0);

  const handleExecute = () => {
    const stepMatches = executeRegexStepByStep(regex, text);
    setMatches(stepMatches);
    SetCurrentStep(0); // Set the current step to 0 when executing the regex
  }

  const handleNextStep = () => {
    if (currentStep < matches.length - 1) {
      SetCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      SetCurrentStep(currentStep - 1);
    }
  };

  const explanation = explainRegex(regex);

  return (
    <div className="app">
      <h1>Regex Debugger + Learning Tool</h1>
      <div>
        <label>
          Regex:
          <input
            type="text"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder="Enter your regex"
          />
        </label>
      </div>
      <div>
        <label>
          Text:
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to match against"
          />
        </label>
      </div>
      <button onClick={handleExecute}>Execute</button>
      <div>
        <button onClick={handlePreviousStep} disabled={currentStep === 0}>
          Previous Step
        </button>
        <button onClick={handleNextStep} disabled={currentStep === matches.length - 1}>
          Next Step
        </button>
      </div>
      <div>
        <h2>Explanation:</h2>
        <p>{explanation}</p>
      </div>
      <div>
        <h2>Matches:</h2>
        {matches.length > 0 ? (
          <div style={{ backgroundColor: '#f4f4f4', padding: '10px' }}>
            <p>Current Match: {matches[currentStep]}</p>
          </div>
        ) : (
          <p>No matches found.</p>
        )}
      </div>
    </div>
  );
}

export default App
