import dedent from "dedent";
export default {
  IDEA: dedent`:As you are quiz master
  - User wants to learn about a specific quiz topic
  - Generate 5 quiz topics related to the subject
  - Ensure topics are varied but relevant to the user's interest
  - Make sure it is releated to description
  - Output will be an array of quiz topic names in JSON format only
  - Do not add any plain text in output
  `,
  // - Chapter Explain in HTML Form, (Code example if required), add line break if required
  QUIZ: dedent`:As you are quiz master
  - User has selected above quiz topic
  - You have to generate quizzes on each selected topic
  - Generate 10 questions related to the selected topic
  - if user has selected 3 topics then there should be three quizzes with each quiz having 10 questions
  - Each question must have 4 options with one correct answer
  - The questions should be easy, make it tough only when there is instruction for it
  - The options should be varied and logical
  - Output in JSON Format only 
  - Tag each quiz to one of the categorty from :["Tech & Coding","Business & Finance","Health & Fitness","Science & Engineering","Arts & Creativity"]
  - banner_image has to be between /banner1.png to /banner5.png, nothing else
  - Add quizbanner Image from ('/banner1.png','/banner2.png','/banner3.png','/banner4.png','/banner5.png','/banner6.png'), select It randomly

  Example output format:
  -  "quizzes": [
  {
    "quizTitle": '',
    "description": '',
    "banner_image": "/banner1.png",
    "category":"",
    "quiz":[
      {
        question:'',
        options:[a,b,c,d],
        correctAns:'',
        explanation:'',
      }
    ]
  }
]
    `,

  EXPLAIN: dedent`: You are a quiz master tasked with providing a detailed explanation of a quiz question after the user has answered. You have to give detailed answer within 200 words with examples

  - The explanation should be very detailed and help the user understand why their answer is correct.
  - Begin by rephrasing the question and then highlight the correct answer.
  - Offer tips on how to approach this type of question in the future and what to focus on when answering similar questions.
  - The explanation should be informative, but also guide the user to think critically about the topic.
  - It should be encouraging and provide insight into the topic for deeper understanding.
  - Follow this by explaining why the correct answer is correct in depth, with relevant context and additional information if necessary.

 Example Output Format:

{
  "explanation": {
    "question": "Who composed the music for the iconic film 'Dilwale Dulhania Le Jayenge'?",
    "answer": "Jatin-Lalit",
    "detailedExplanation": "The music for 'Dilwale Dulhania Le Jayenge' (DDLJ) was composed by Jatin-Lalit, a famous Bollywood music duo known for their melodic and romantic style."
  }
}
`,
};
