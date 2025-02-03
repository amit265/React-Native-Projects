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
        options:['a',b,c,d],
        correctAns:''
      }
    ]
  }
]
    `,
};
