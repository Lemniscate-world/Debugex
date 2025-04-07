export function explainRegex(regex: string): string {
    // Simple explanations for common patterns
    if (regex === '\\d+') {
      return 'Matches one or more digits';
    } else if (regex === '\\w+') {
      return 'Matches one or more word characters (letters, digits, underscores)';
    } else if (regex === '\\s+') {
      return 'Matches one or more whitespace characters';
    } else {
      return 'No explanation available for this pattern';
    }
  }
  