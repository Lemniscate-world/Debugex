import { describe, it, expect, vi } from 'vitest';
import { executeRegexStepByStep } from './RegexExecution';

describe('RegexExecution Performance', () => {
  it('should handle large input text efficiently', () => {
    const regex = '\\w+';
    // Generate a large text (about 100KB)
    const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];
    let largeText = '';
    for (let i = 0; i < 2000; i++) {
      largeText += words[i % words.length] + ' ';
    }

    const startTime = performance.now();
    const result = executeRegexStepByStep(regex, largeText);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    console.log(`Execution time for large input: ${executionTime}ms`);
    expect(result.matches.length).toBeGreaterThan(1000);
    // Execution should be reasonably fast (adjust threshold as needed)
    expect(executionTime).toBeLessThan(1000); // Less than 1 second
  });

  it('should handle complex regex on medium text efficiently', () => {
    // Email regex pattern
    const regex = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}';

    // Generate text with many email addresses
    let text = '';
    for (let i = 0; i < 500; i++) {
      text += `Contact user${i}@example.com or admin${i}@test-site.co.uk for support. `;
    }

    const startTime = performance.now();
    const result = executeRegexStepByStep(regex, text);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    console.log(`Execution time for complex regex: ${executionTime}ms`);
    expect(result.matches.length).toBe(1000); // 2 emails per iteration, 500 iterations
    expect(executionTime).toBeLessThan(500); // Less than 0.5 seconds
  });

  it('should handle potentially catastrophic backtracking patterns', () => {
    // This is a pattern that can cause catastrophic backtracking
    const regex = '(a+)+b';
    // Create a string that will cause a lot of backtracking, but not too much
    const text = 'a'.repeat(10) + 'c'; // No match, forces backtracking

    const startTime = performance.now();
    const result = executeRegexStepByStep(regex, text);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    console.log(`Execution time for backtracking pattern: ${executionTime}ms`);
    expect(result.matches.length).toBe(0);
  });
});
