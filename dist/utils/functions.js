export function findBestWord(statement, stringsArray) {
    // Split the statement into words
    const words = statement.split(' ');
    // Initialize variables to store the best word and the maximum score
    let bestWord = '';
    let maxScore = 0;
    // Iterate through each word in the statement
    for (const word of words) {
        // Initialize the score for the current word
        let score = 0;
        // Iterate through each string in the array
        for (const str of stringsArray) {
            // Calculate the number of characters in common between the word and the string
            const commonChars = [...new Set(word)].filter(char => str.includes(char)).length;
            // Update the score if it's higher than the current score
            if (commonChars > score) {
                score = commonChars;
            }
        }
        // Update the bestWord and maxScore if the current word has a higher score
        if (score > maxScore) {
            bestWord = word;
            maxScore = score;
        }
    }
    return bestWord;
}
