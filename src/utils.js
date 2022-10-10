export const roundNumber = (number, decimal = 4) => {
  if (isNaN(number)) {
    return "";
  }
  const x = Math.pow(10, decimal);
  return Math.round(number * x) / x;
};

export const countProduction = (tab) => {
  let res = 0;

  for (const i in tab) {
    const current = tab[i];
    for (const j in current.expectedProduction) {
      const currentExpectedProduction = current.expectedProduction[j];
      res += Number(currentExpectedProduction.value);
    }
  }

  return res;
};

export const getDifficulty = (intern, difficultiesGesters, difficulty) => {
  const filteredIds = difficultiesGesters
    .filter((el) => el.difficulty === difficulty)
    .map((el) => el.objectId);
  const filteredItern = intern.filter((el) => filteredIds.includes(el.itemId));

  return {
    recipeNumber: filteredItern.length,
    totalNumber: countProduction(filteredItern)
  };
};

export const getAverageDifficulty = (difficulty1, difficulty2, difficulty3) => {
  const average =
    (difficulty1 + 2 * difficulty2 + 3 * difficulty3) /
    (difficulty1 + difficulty2 + difficulty3);

  return roundNumber(average, 2) || 0;
};

export const getSumGesters = (intern, difficultiesGesters) => {
  let res = 0;

  for (const current of intern) {
    const difficultyGesters = difficultiesGesters.find(
      (el) => el.objectId === current.itemId
    );

    if (difficultyGesters && difficultyGesters.gesters) {
      let count = 0;
      for (const currentExpectedProduction of current.expectedProduction) {
        count += Number(currentExpectedProduction.value);
      }

      res += count * difficultyGesters.gesters;
    }
  }

  return res;
};
