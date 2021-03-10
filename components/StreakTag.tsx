import { Text } from "@chakra-ui/layout";

interface StreakTagProps {
  currentStreak?: number;
  longestStreak?: number;
}

function StreakTag({ currentStreak }: StreakTagProps) {
  return <Text fontSize="small">🔥 {currentStreak}-day streak</Text>;
}

export default StreakTag;
