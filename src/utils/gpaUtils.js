export const gradeToPoint = {
  'A+': 4.0,
  'A': 3.6,
  'B+': 3.2,
  'B': 2.8,
  'C+': 2.4,
  'C': 2.0,
  'D': 1.6,
  'NG': 0.0,
};

export function calculateGPA(subjects) {
  const totalCredit = subjects.reduce((sum, s) => sum + Number(s.credit), 0);

  const totalPoints = subjects.reduce((sum, s) => {
    const theoryGP = gradeToPoint[s.theoryGrade?.toUpperCase()] ?? 0;
    const practicalGP = gradeToPoint[s.practicalGrade?.toUpperCase()] ?? 0;
    const combinedGP =
      theoryGP * (s.theoryWeight ?? 1) + practicalGP * (s.practicalWeight ?? 0);

    return sum + combinedGP * Number(s.credit);
  }, 0);

  return (totalPoints / totalCredit).toFixed(2);
}
