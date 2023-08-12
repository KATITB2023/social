import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Button,
} from "@react-email/components";

export const ForgotPassword = ({
  resetURL,
  name,
}: {
  resetURL: string;
  name: string;
}) => {
  return (
    <Html>
      <Head />
      <Preview>Reset Password</Preview>
      <Body>
        <Container>
          <Row>
            <Row>
              <Img width={340} src={``} />
            </Row>
            <Row>
              <Heading>RESET PASSWORD</Heading>
            </Row>
          </Row>
          <Section>
            <Text>
              Hai {name},<br />
              <br />
              Anda menerima surel ini karena kami menerima permintaan untuk
              reset password akun Anda. Jika Anda tidak mengirim permintaan
              untuk me-reset password, Anda dapat mengabaikan surel ini.
              <br />
            </Text>
            <Button href={resetURL}>Reset Password</Button>
            <Text>
              Jika tombol di atas tidak berfungsi, silakan klik tautan{" "}
              <Link href={resetURL}>berikut</Link>.
            </Text>
          </Section>
        </Container>
        <Section>
          <Text>Surel ini dikirim oleh Tim OSKM ITB.</Text>
          <Link href="https://oskmitb.com">Website</Link>
          {" | "}
          <Link href={""}>Kontak</Link>
        </Section>
      </Body>
    </Html>
  );
};

export default ForgotPassword;
