export const PraticeOption = [
  {
    name: "Quiz",
    image: require("./../assets/images/quizz.png"),
    icon: require("./../assets/images/quiz.png"),
    path: "/quiz",
  },
  {
    name: "Flashcards",
    image: require("./../assets/images/flashcard.png"),
    icon: require("./../assets/images/layers.png"),
    path: "/flashcards",
  },
  {
    name: "Question & Ans",
    image: require("./../assets/images/notes.png"),
    icon: require("./../assets/images/qa.png"),
    path: "/questionAnswer",
  },
];

export const imageAssets = {
  "/banner1.png": require("./../assets/images/banner1.png"),
  "/banner2.png": require("./../assets/images/banner2.png"),
  "/banner3.png": require("./../assets/images/banner3.png"),
  "/banner4.png": require("./../assets/images/banner4.png"),
  "/banner5.png": require("./../assets/images/banner5.png"),
};

export const CourseCategory = [
  "Tech & Coding",
  "Business & Finance",
  "Health & Fitness",
  "Science & Engineering",
  "Arts & Creativity",
];

export const ProfileMenu = [
  {
    name: "Add Quiz",
    icon: "add-outline", //Ionic Icons
    path: "/addquiz",
  },
  {
    name: "My Quiz",
    icon: "book", //Ionic Icons
    path: "/(tabs)/quiz",
  },
  {
    name: "Quiz History",
    icon: "analytics-outline", //Ionic Icons
    path: "/quizhistory",
  },
  // {
  //   name: "My Subscription",
  //   icon: "shield-checkmark", //Ionic Icons
  //   path: "/subscription",
  // },
  {
    name: "Leaderboard",
    icon: "bar-chart-outline", //Ionic Icons
    path: "/leaderboard",
  },

  {
    name: "Logout",
    icon: "log-out", //Ionic Icons
    path: "/login",
  },
];
