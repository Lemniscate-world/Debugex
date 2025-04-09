import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import * as RegexExecution from './RegexExecution';

// Mock the RegexExecution module
vi.mock('./RegexExecution', () => ({
  executeRegexStepByStep: vi.fn()
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('Regex Debugger + Learning Tool')).toBeInTheDocument();
  });

  it('allows entering regex pattern and text', () => {
    render(<App />);

    const regexInput = screen.getByPlaceholderText('Enter your regex');
    const textInput = screen.getByPlaceholderText('Enter text to match against');

    fireEvent.change(regexInput, { target: { value: '\\d+' } });
    fireEvent.change(textInput, { target: { value: 'abc 123 def' } });

    expect(regexInput).toHaveValue('\\d+');
    expect(textInput).toHaveValue('abc 123 def');
  });

  it('executes regex when Execute button is clicked', () => {
    // Mock implementation for this test
    const mockExecuteRegex = vi.mocked(RegexExecution.executeRegexStepByStep);
    mockExecuteRegex.mockReturnValue({ matches: ['123'] });

    render(<App />);

    const regexInput = screen.getByPlaceholderText('Enter your regex');
    const textInput = screen.getByPlaceholderText('Enter text to match against');
    const executeButton = screen.getByText('Execute');

    fireEvent.change(regexInput, { target: { value: '\\d+' } });
    fireEvent.change(textInput, { target: { value: 'abc 123 def' } });
    fireEvent.click(executeButton);

    expect(mockExecuteRegex).toHaveBeenCalledWith('\\d+', 'abc 123 def');
  });

  it('shows no matches when none are found', () => {
    // Mock implementation for this test
    const mockExecuteRegex = vi.mocked(RegexExecution.executeRegexStepByStep);
    mockExecuteRegex.mockReturnValue({ matches: [] });

    render(<App />);

    const executeButton = screen.getByText('Execute');
    fireEvent.click(executeButton);

    expect(screen.getByText('No matches found.')).toBeInTheDocument();
  });

  it('disables navigation buttons appropriately', () => {
    // Mock implementation for this test
    const mockExecuteRegex = vi.mocked(RegexExecution.executeRegexStepByStep);
    mockExecuteRegex.mockReturnValue({ matches: ['123', '456'] });

    render(<App />);

    const executeButton = screen.getByText('Execute');
    fireEvent.click(executeButton);

    const prevButton = screen.getByText('Previous Step');
    const nextButton = screen.getByText('Next Step');

    // Initially, prev should be disabled and next enabled
    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('shows error message when regex execution fails', () => {
    // Mock implementation for this test
    const mockExecuteRegex = vi.mocked(RegexExecution.executeRegexStepByStep);
    mockExecuteRegex.mockReturnValue({ matches: [], error: 'Invalid regular expression' });

    render(<App />);

    const executeButton = screen.getByText('Execute');
    fireEvent.click(executeButton);

    expect(screen.getByText('Error: Invalid regular expression')).toBeInTheDocument();
  });
});