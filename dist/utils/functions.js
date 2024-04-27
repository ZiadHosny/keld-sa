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
export function compareWords(word1, word2) {
    // If the words are exactly the same, return true
    if (word1 === word2) {
        return true;
    }
    // If the lengths of the words are not equal, they can't match except for one character
    if (word1.length !== word2.length) {
        return false;
    }
    let diffCount = 0; // Variable to count the number of differing characters
    // Loop through each character of both words
    for (let i = 0; i < word1.length; i++) {
        // If characters at the same position are different, increment the difference count
        if (word1[i] !== word2[i]) {
            diffCount++;
            // If there are more than one differing characters, return false
            if (diffCount > 1) {
                return false;
            }
        }
    }
    // If there's exactly one differing character, return true
    return diffCount === 1;
}
