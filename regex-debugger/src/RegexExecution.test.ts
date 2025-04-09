import { describe, it, expect } from 'vitest';
import { executeRegexStepByStep } from './RegexExecution';

describe('executeRegexStepByStep', () => {
  it('should find all matches for a simple pattern', () => {
    const regex = 'a+';
    const text = 'aaa bbb aaa';
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(matches).toHaveLength(2);
    expect(matches[0]).toBe('aaa');
    expect(matches[1]).toBe('aaa');
  });

  it('should return an empty array when no matches are found', () => {
    const regex = 'z+';
    const text = 'aaa bbb ccc';
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(matches).toHaveLength(0);
  });

  it('should handle digit patterns correctly', () => {
    const regex = '\\d+';
    const text = 'abc 123 def 456';
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(matches).toHaveLength(2);
    expect(matches[0]).toBe('123');
    expect(matches[1]).toBe('456');
  });

  it('should handle word character patterns correctly', () => {
    const regex = '\\w+';
    const text = 'abc 123 def!';
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(matches).toHaveLength(3);
    expect(matches[0]).toBe('abc');
    expect(matches[1]).toBe('123');
    expect(matches[2]).toBe('def');
  });

  it('should handle capture groups correctly', () => {
    const regex = '(a+)(b+)';
    const text = 'aabb abbb';
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(matches).toHaveLength(2);
    expect(matches[0]).toBe('aabb');
    expect(matches[1]).toBe('abbb');
  });

  it('should handle complex patterns', () => {
    const regex = '[a-z]+\\d+';
    const text = 'abc123 def456 ghi';
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(matches).toHaveLength(2);
    expect(matches[0]).toBe('abc123');
    expect(matches[1]).toBe('def456');
  });
});
