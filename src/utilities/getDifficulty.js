// find quiz difficulty
export function getDifficulty(questions) {
  const difficultyValues = { easy: 1, medium: 3, hard: 5 };
  const difficultyCounts = { easy: 0, medium: 0, hard: 0 };

  // count difficulties
  questions.forEach((question) => {
    difficultyCounts[question.difficulty] += 1;
  });

  // calc totals (scores and questions)
  let totalScore = 0;
  let totalCount = 0;

  for (const difficulty in difficultyCounts) {
    totalScore += difficultyCounts[difficulty] * difficultyValues[difficulty];
    totalCount += difficultyCounts[difficulty];
  }

  // calc avg
  const averageDifficulty = totalCount ? totalScore / totalCount : 0;

  // label difficulty
  if (averageDifficulty === 1) {
    return "Very Easy";
  } else if (averageDifficulty > 1 && averageDifficulty <= 2.499) {
    return "Easy";
  } else if (averageDifficulty > 2.499 && averageDifficulty <= 3.599) {
    return "Medium";
  } else if (averageDifficulty > 3.599 && averageDifficulty < 4.999) {
    return "Hard";
  } else if (averageDifficulty === 5) {
    return "Very Hard";
  }
}
