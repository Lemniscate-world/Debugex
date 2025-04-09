import { describe, it, expect } from 'vitest';
import { executeRegexStepByStep } from './RegexExecution';
import { explainRegex } from './Explanation';

describe('Integration between RegexExecution and Explanation', () => {
  it('should correctly explain and execute digit pattern', () => {
    const regex = '\\d+';
    const text = 'abc 123 def 456';

    const explanation = explainRegex(regex);
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(explanation).toBe('Matches one or more digits');
    expect(matches).toHaveLength(2);
    expect(matches[0]).toBe('123');
    expect(matches[1]).toBe('456');
  });

  it('should correctly explain and execute word character pattern', () => {
    const regex = '\\w+';
    const text = 'abc 123 def!';

    const explanation = explainRegex(regex);
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(explanation).toBe('Matches one or more word characters (letters, digits, underscores)');
    expect(matches).toHaveLength(3);
    expect(matches[0]).toBe('abc');
    expect(matches[1]).toBe('123');
    expect(matches[2]).toBe('def');
  });

  it('should correctly explain and execute whitespace pattern', () => {
    const regex = '\\s+';
    const text = 'abc   def  ghi';

    const explanation = explainRegex(regex);
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(explanation).toBe('Matches one or more whitespace characters');
    expect(matches).toHaveLength(2);
    expect(matches[0]).toBe('   ');
    expect(matches[1]).toBe('  ');
  });

  it('should handle unknown patterns correctly', () => {
    const regex = '[a-z]+';
    const text = 'abc DEF ghi';

    const explanation = explainRegex(regex);
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(explanation).toBe('No explanation available for this pattern');
    expect(matches).toHaveLength(2);
    expect(matches[0]).toBe('abc');
    expect(matches[1]).toBe('ghi');
  });
});
