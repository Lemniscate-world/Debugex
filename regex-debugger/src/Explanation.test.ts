import { describe, it, expect } from 'vitest';
import { explainRegex } from './Explanation';

describe('explainRegex', () => {
  it('should explain digit pattern correctly', () => {
    const explanation = explainRegex('\\d+');
    expect(explanation).toBe('Matches one or more digits');
  });

  it('should explain word character pattern correctly', () => {
    const explanation = explainRegex('\\w+');
    expect(explanation).toBe('Matches one or more word characters (letters, digits, underscores)');
  });

  it('should explain whitespace pattern correctly', () => {
    const explanation = explainRegex('\\s+');
    expect(explanation).toBe('Matches one or more whitespace characters');
  });

  it('should return default message for unknown patterns', () => {
    const explanation = explainRegex('[a-z]+');
    expect(explanation).toBe('No explanation available for this pattern');
  });

  it('should handle empty input', () => {
    const explanation = explainRegex('');
    expect(explanation).toBe('No explanation available for this pattern');
  });
});
