import { describe, it, expect } from 'vitest';
import { executeRegexStepByStep } from './RegexExecution';

describe('RegexExecution Error Handling', () => {
  it('should handle empty regex pattern', () => {
    const result = executeRegexStepByStep('', 'some text');

    expect(result.matches).toHaveLength(0);
    expect(result.error).toBe('No regex pattern provided');
  });

  it('should handle empty text', () => {
    const result = executeRegexStepByStep('\\d+', '');

    expect(result.matches).toHaveLength(0);
    expect(result.error).toBe('No text to match against');
  });

  it('should handle invalid regex pattern', () => {
    const result = executeRegexStepByStep('(unclosed', 'some text');

    expect(result.matches).toHaveLength(0);
    expect(result.error).toBeDefined();
  });
});
