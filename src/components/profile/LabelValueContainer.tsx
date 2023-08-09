import { Flex, Text, Box } from "@chakra-ui/react";
import styles from "./LabelValueContainer.module.css";

interface LabelValueType {
  label: string;
  value?: string;
}
export default function LabelValueContainer({
  label,
  value = "-",
}: LabelValueType) {
  return (
    <Flex color="white" gap="4px" flexDirection="column">
      <Text size="B5">{label}</Text>
      <Box
        maxHeight="90px"
        overflowY={value.length > 90 ? "scroll" : "hidden"}
        className={styles["custom-scrollbar"]}
      >
        <Text size="B2">{value}</Text>
      </Box>
    </Flex>
  );
}
