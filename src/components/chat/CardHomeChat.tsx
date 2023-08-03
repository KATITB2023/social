import { Card } from "@chakra-ui/react";

interface CardHomeChatProps {
  children: React.ReactNode;
}

const CardHomeChat: React.FC<CardHomeChatProps> = ({ children }) => {
  return (
    <Card borderRadius="10px" bg="rgba(25, 22, 36, 0.90)" w="90%" p="15px 20px" boxShadow="0px 4px 20px 0px rgba(152, 249, 255, 0.50)">
      {children}
    </Card>
  );
};

export default CardHomeChat;