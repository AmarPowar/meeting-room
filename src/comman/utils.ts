export function calculateIntroTime(
  peopleCount: number,
  timePerPair: number,
): number {
  if (peopleCount <= 1) return 0;
  const rounds = peopleCount % 2 === 0 ? peopleCount - 1 : peopleCount;
  return rounds * timePerPair;
}
