import { Html, Button } from "@react-email/components";

export const ForgotPassword = ({ resetURL }: { resetURL: string }) => {
  return (
    <Html>
      <Button href={resetURL}>Reset Password</Button>
    </Html>
  );
};

export default ForgotPassword;
