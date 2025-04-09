// Interface for regex execution result
export interface RegexResult {
    matches: string[];
    error?: string;
}

// Function to execute regex step-by-step and highlight matches
export function executeRegexStepByStep(regex: string, text: string): RegexResult {
    const matches: string[] = [];
    let match;

    // Handle empty inputs
    if (!regex || !text) {
        return { matches, error: regex ? 'No text to match against' : 'No regex pattern provided' };
    }

    try {
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp
        const regexObj = new RegExp(regex, 'g'); // Global flag to find all matches

        while ((match = regexObj.exec(text)) !== null) {
            matches.push(match[0]);
        }

        return { matches };
    } catch (error) {
        return {
            matches,
            error: error instanceof Error ? error.message : 'Invalid regular expression'
        };
    }
}