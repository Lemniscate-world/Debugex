// Function to execute regex step-by-step and highlight matches
export function executeRegexStepByStep(regex: string, text: string) {
    const matches: string[] = [];
    let match;
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp
    const regexObj = new RegExp(regex, 'g'); // Global flag to find all matches
    
    while ((match = regexObj.exec(text)) !== null) {
        matches.push(match[0]);
    }
    
    return matches;
}