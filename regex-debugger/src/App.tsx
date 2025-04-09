import React, { useState } from 'react'
import { executeRegexStepByStep } from './RegexExecution';
import './App.css'
import { explainRegex } from './Explanation';
import { FaGithub } from 'react-icons/fa';

const App: React.FC = () => {
  const [regex, setRegex] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [matches, setMatches] = useState<string[]>([]);
  const [currentStep, SetCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string | undefined>();

  const handleExecute = () => {
    const result = executeRegexStepByStep(regex, text);
    setMatches(result.matches);
    setError(result.error);
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
      <h1>Debugex - Regex Debugger + Learning Tool</h1>

      <div className="input-group">
        <label htmlFor="regex-input">Regex Pattern:</label>
        <input
          id="regex-input"
          type="text"
          value={regex}
          onChange={(e) => setRegex(e.target.value)}
          placeholder="Enter your regex pattern (e.g., \d+, [a-z]+)"
        />
      </div>

      <div className="input-group">
        <label htmlFor="text-input">Test Text:</label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to match against your regex pattern"
        />
      </div>

      <button className="execute-button" onClick={handleExecute}>Execute Regex</button>

      <div className="button-group">
        <button onClick={handlePreviousStep} disabled={currentStep === 0 || matches.length === 0}>
          ← Previous Match
        </button>
        <button onClick={handleNextStep} disabled={currentStep === matches.length - 1 || matches.length === 0}>
          Next Match →
        </button>
      </div>

      {matches.length > 0 && (
        <div className="step-indicator">
          Match {currentStep + 1} of {matches.length}
        </div>
      )}

      <div>
        <h2>Explanation</h2>
        <div className="explanation-box">
          <p>{explanation || "Enter a regex pattern to see an explanation."}</p>
        </div>
      </div>

      <div>
        <h2>Matches</h2>
        {error ? (
          <div className="error-box">
            <p>Error: {error}</p>
          </div>
        ) : matches.length > 0 ? (
          <div className="result-box">
            <p>Current Match: <span className="match-highlight">{matches[currentStep]}</span></p>
          </div>
        ) : (
          <div className="result-box">
            <p>No matches found. Try a different pattern or text.</p>
          </div>
        )}
      </div>

      <div className="footer">
        <a
          href="https://ko-fi.com/kuroio"
          target="_blank"
          rel="noopener noreferrer"
          className="sponsor-button"
        >
          ❤️ Support on Ko-fi
        </a>
        <p style={{ marginTop: '1rem' }}>
          <a
            href="https://github.com/Lemniscate-world/debugex"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <FaGithub /> View on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}

export default App
