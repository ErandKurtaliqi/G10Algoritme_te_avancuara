
function findLongestQuestionPath(questionnaire) {
    // Create a map for quick question lookup
    const questionMap = new Map();
    questionnaire.questions.forEach(q => questionMap.set(q.id, q));
    
    let longestPath = {
        length: 0,
        question_ids: [],
        answer_path: []
    };
    

    function dfs(questionId, currentPath, currentAnswers, visited) {
        if (!questionId) {
            if (currentPath.length > longestPath.length) {
                longestPath = {
                    length: currentPath.length,
                    question_ids: [...currentPath],
                    answer_path: [...currentAnswers]
                };
            }
            return;
        }
        
        // Base case 2: Cycle detected (question already visited in this path)
        if (visited.has(questionId)) {
            if (currentPath.length > longestPath.length) {
                longestPath = {
                    length: currentPath.length,
                    question_ids: [...currentPath],
                    answer_path: [...currentAnswers]
                };
            }
            return;
        }
        
        // Get the question object
        const question = questionMap.get(questionId);
        if (!question) {
            // Invalid question ID - treat as end
            if (currentPath.length > longestPath.length) {
                longestPath = {
                    length: currentPath.length,
                    question_ids: [...currentPath],
                    answer_path: [...currentAnswers]
                };
            }
            return;
        }
        
        // Add current question to path and visited set
        const newPath = [...currentPath, questionId];
        const newVisited = new Set(visited);
        newVisited.add(questionId);
        
        // Handle different question types
        if (question.type === "text" || question.type === "checkbox") {
            // Unconditional next question (no answer choices)
            dfs(question.next_question_id, newPath, currentAnswers, newVisited);
        } else if (question.answers && question.answers.length > 0) {
            // Conditional next based on answers (radio/select types)
            // Explore all possible answer branches
            for (const answer of question.answers) {
                const newAnswers = [...currentAnswers, answer.id];
                dfs(answer.next_question_id, newPath, newAnswers, newVisited);
            }
        } else {
            // No next question - end of path
            if (newPath.length > longestPath.length) {
                longestPath = {
                    length: newPath.length,
                    question_ids: [...newPath],
                    answer_path: [...currentAnswers]
                };
            }
        }
    }
    
    // Start DFS from the starting question
    dfs(questionnaire.start_question_id, [], [], new Set());
    
    return longestPath;
}

// Sample questionnaire data from the assignment
const questionnaire = {
    "start_question_id": "q1",
    "questions": [
        {
            "id": "q1",
            "text": "Do you own a car?",
            "type": "radio",
            "answers": [
                {
                    "id": "a1_yes",
                    "text": "Yes",
                    "next_question_id": "q2"
                },
                {
                    "id": "a1_no",
                    "text": "No",
                    "next_question_id": "q5"
                }
            ]
        },
        {
            "id": "q2",
            "text": "What type of car do you own?",
            "type": "select",
            "answers": [
                {
                    "id": "a2_sedan",
                    "text": "Sedan",
                    "next_question_id": "q3"
                },
                {
                    "id": "a2_suv",
                    "text": "SUV",
                    "next_question_id": "q3"
                },
                {
                    "id": "a2_truck",
                    "text": "Truck",
                    "next_question_id": "q4"
                },
                {
                    "id": "a2_sports",
                    "text": "Sports Car",
                    "next_question_id": "q4"
                }
            ]
        },
        {
            "id": "q3",
            "text": "How many passengers can your vehicle seat?",
            "type": "radio",
            "answers": [
                {
                    "id": "a3_2to5",
                    "text": "2-5",
                    "next_question_id": "q6"
                },
                {
                    "id": "a3_6plus",
                    "text": "6+",
                    "next_question_id": "q6"
                }
            ]
        },
        {
            "id": "q4",
            "text": "Do you use your vehicle for work purposes?",
            "type": "radio",
            "answers": [
                {
                    "id": "a4_yes",
                    "text": "Yes",
                    "next_question_id": "q7"
                },
                {
                    "id": "a4_no",
                    "text": "No",
                    "next_question_id": "q6"
                }
            ]
        },
        {
            "id": "q5",
            "text": "What is your primary mode of transportation?",
            "type": "select",
            "answers": [
                {
                    "id": "a5_public",
                    "text": "Public Transit",
                    "next_question_id": "q6"
                },
                {
                    "id": "a5_bike",
                    "text": "Bicycle",
                    "next_question_id": "q6"
                },
                {
                    "id": "a5_walk",
                    "text": "Walking",
                    "next_question_id": "q6"
                }
            ]
        },
        {
            "id": "q6",
            "text": "What is your annual commute distance?",
            "type": "text",
            "next_question_id": "q8"
        },
        {
            "id": "q7",
            "text": "What percentage of your vehicle use is for work?",
            "type": "text",
            "next_question_id": "q8"
        },
        {
            "id": "q8",
            "text": "Are you satisfied with your current transportation situation?",
            "type": "radio",
            "answers": [
                {
                    "id": "a8_yes",
                    "text": "Yes",
                    "next_question_id": null
                },
                {
                    "id": "a8_no",
                    "text": "No",
                    "next_question_id": "q9"
                }
            ]
        },
        {
            "id": "q9",
            "text": "What would you like to improve?",
            "type": "text",
            "next_question_id": null
        }
    ]
};

console.log("Testing Problem 1: Find Longest Question Path\n");
const result = findLongestQuestionPath(questionnaire);

console.log("Result:", result);
console.log("\nExpected:");
console.log({
    length: 6,
    question_ids: ["q1", "q2", "q4", "q7", "q8", "q9"],
    answer_path: ["a1_yes", "a2_truck", "a4_yes", "a8_no"]
});

console.log("\n--- Path Explanation ---");
console.log("q1: Do you own a car? → Answer: Yes (a1_yes)");
console.log("q2: What type of car do you own? → Answer: Truck (a2_truck)");
console.log("q4: Do you use your vehicle for work purposes? → Answer: Yes (a4_yes)");
console.log("q7: What percentage of your vehicle use is for work? → (text input)");
console.log("q8: Are you satisfied with your current transportation situation? → Answer: No (a8_no)");
console.log("q9: What would you like to improve? → (text input) → END");
console.log("\nTotal questions in longest path: 6");

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { findLongestQuestionPath };
}

