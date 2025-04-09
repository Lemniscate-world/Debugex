import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import * as RegexExecution from './RegexExecution';

// Mock the RegexExecution module
vi.mock('./RegexExecution', () => ({
  executeRegexStepByStep: vi.fn()
}));

describe('App Visual Regression Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the initial UI correctly', () => {
    const { container } = render(<App />);
    
    // Check that all main UI elements are present
    expect(screen.getByText('Regex Debugger + Learning Tool')).toBeInTheDocument();
    expect(screen.getByText('Regex:')).toBeInTheDocument();
    expect(screen.getByText('Text:')).toBeInTheDocument();
    expect(screen.getByText('Execute')).toBeInTheDocument();
    expect(screen.getByText('Previous Step')).toBeInTheDocument();
    expect(screen.getByText('Next Step')).toBeInTheDocument();
    expect(screen.getByText('Explanation:')).toBeInTheDocument();
    expect(screen.getByText('Matches:')).toBeInTheDocument();
    
    // Initial state should show "No matches found"
    expect(screen.getByText('No matches found.')).toBeInTheDocument();
    
    // Snapshot the initial UI
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('renders matches correctly', () => {
    const mockExecuteRegex = vi.mocked(RegexExecution.executeRegexStepByStep);
    mockExecuteRegex.mockReturnValue({ matches: ['match1', 'match2'] });
    
    const { container } = render(<App />);
    
    // Execute the regex
    fireEvent.click(screen.getByText('Execute'));
    
    // Check that the match is displayed
    expect(screen.getByText('Current Match: match1')).toBeInTheDocument();
    
    // Snapshot the UI with matches
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('renders error state correctly', () => {
    const mockExecuteRegex = vi.mocked(RegexExecution.executeRegexStepByStep);
    mockExecuteRegex.mockReturnValue({ matches: [], error: 'Invalid regular expression' });
    
    const { container } = render(<App />);
    
    // Execute the regex
    fireEvent.click(screen.getByText('Execute'));
    
    // Check that the error is displayed
    expect(screen.getByText('Error: Invalid regular expression')).toBeInTheDocument();
    
    // Snapshot the UI with error
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('renders step navigation correctly', () => {
    const mockExecuteRegex = vi.mocked(RegexExecution.executeRegexStepByStep);
    mockExecuteRegex.mockReturnValue({ matches: ['match1', 'match2', 'match3'] });
    
    const { container } = render(<App />);
    
    // Execute the regex
    fireEvent.click(screen.getByText('Execute'));
    
    // Check initial state
    expect(screen.getByText('Current Match: match1')).toBeInTheDocument();
    
    // Navigate to next step
    fireEvent.click(screen.getByText('Next Step'));
    expect(screen.getByText('Current Match: match2')).toBeInTheDocument();
    
    // Snapshot after navigation
    expect(container.innerHTML).toMatchSnapshot();
    
    // Navigate to next step again
    fireEvent.click(screen.getByText('Next Step'));
    expect(screen.getByText('Current Match: match3')).toBeInTheDocument();
    
    // Previous button should be enabled, next button should be disabled
    const prevButton = screen.getByText('Previous Step');
    const nextButton = screen.getByText('Next Step');
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();
    
    // Navigate back
    fireEvent.click(prevButton);
    expect(screen.getByText('Current Match: match2')).toBeInTheDocument();
    
    // Final snapshot
    expect(container.innerHTML).toMatchSnapshot();
  });
});
