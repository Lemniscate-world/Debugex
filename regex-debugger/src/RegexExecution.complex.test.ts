import { describe, it, expect } from 'vitest';
import { executeRegexStepByStep } from './RegexExecution';

describe('RegexExecution with Complex Patterns', () => {
  it('should handle lookahead assertions', () => {
    const regex = '\\w+(?=ing)';
    const text = 'I am walking and running but not talk';
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(matches).toHaveLength(2);
    expect(matches[0]).toBe('walk');
    expect(matches[1]).toBe('runn');
  });

  it('should handle lookbehind assertions', () => {
    const regex = '(?<=\\$)\\d+';
    const text = 'Items cost $15, €25, and $30';
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(matches).toHaveLength(2);
    expect(matches[0]).toBe('15');
    expect(matches[1]).toBe('30');
  });

  it('should handle non-capturing groups', () => {
    const regex = '(?:https?|ftp)://[\\w-]+\\.[\\w.-]+';
    const text = 'Visit http://example.com or https://test.co.uk or ftp://files.net';
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(matches).toHaveLength(3);
    expect(matches[0]).toBe('http://example.com');
    expect(matches[1]).toBe('https://test.co.uk');
    expect(matches[2]).toBe('ftp://files.net');
  });

  it('should handle backreferences', () => {
    const regex = '<(\\w+)>.*?</\\1>';
    const text = '<div>Content</div><span>More</span>';
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(matches).toHaveLength(2);
    expect(matches[0]).toBe('<div>Content</div>');
    expect(matches[1]).toBe('<span>More</span>');
  });

  it('should handle character classes and negated classes', () => {
    const regex = '[a-z]+[^a-z0-9][0-9]+';
    const text = 'abc-123 def_456 ghi!789';
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(matches).toHaveLength(3);
    expect(matches[0]).toBe('abc-123');
    expect(matches[1]).toBe('def_456');
    expect(matches[2]).toBe('ghi!789');
  });

  it('should handle greedy vs lazy quantifiers', () => {
    // Greedy
    const greedyRegex = '<.+>';
    const greedyResult = executeRegexStepByStep(greedyRegex, '<tag>content</tag>');
    const greedyMatches = greedyResult.matches;
    expect(greedyMatches).toHaveLength(1);
    expect(greedyMatches[0]).toBe('<tag>content</tag>');

    // Lazy
    const lazyRegex = '<.+?>';
    const lazyResult = executeRegexStepByStep(lazyRegex, '<tag>content</tag>');
    const lazyMatches = lazyResult.matches;
    expect(lazyMatches).toHaveLength(2);
    expect(lazyMatches[0]).toBe('<tag>');
    expect(lazyMatches[1]).toBe('</tag>');
  });

  it('should handle word boundaries', () => {
    const regex = '\\bword\\b';
    const text = 'This is a word in a sentence. Another sentence has the keyword too.';
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(matches).toHaveLength(1);
    expect(matches[0]).toBe('word');
  });

  it('should handle complex email validation pattern', () => {
    const regex = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}';
    const text = 'Contact us at info@example.com or support@test-site.co.uk';
    const result = executeRegexStepByStep(regex, text);
    const matches = result.matches;

    expect(matches).toHaveLength(2);
    expect(matches[0]).toBe('info@example.com');
    expect(matches[1]).toBe('support@test-site.co.uk');
  });
});
