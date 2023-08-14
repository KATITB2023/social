import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Button,
  Column,
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
      <Body style={main}>
        <Container>
          <Section style={content}>
            <Img width={750} src="https://cdn.oskmitb.com/mail-header" />

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Text style={paragraph}>
                  Hai {name},<br />
                  <br />
                  Anda menerima surel ini karena kami menerima permintaan untuk
                  mengubah password akun Anda. Jika Anda tidak mengirim
                  permintaan untuk mengubah password, Anda dapat mengabaikan
                  surel ini.
                  <br />
                </Text>
              </Column>
            </Row>

            <Row style={{ ...boxInfos, paddingTop: "0", paddingBottom: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button style={button} href={resetURL}>
                  <Text style={{ ...buttonText, textAlign: "center" }}>
                    Reset Password
                  </Text>
                </Button>
              </Column>
            </Row>

            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column>
                <Text style={paragraph}>
                  Jika tombol di atas tidak berfungsi, silakan klik tautan{" "}
                  <Link href={resetURL}>berikut</Link>.
                </Text>
              </Column>
            </Row>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "rgb(0,0,0, 0.7)",
              }}
            >
              © Orientasi Studi Keluarga Mahasiswa (OSKM) ITB 2023 {"  |  "}
              <Link
                href="https://oskmitb.com"
                style={{
                  color: "rgb(0,0,0, 0.7)",
                  textDecoration: "underline",
                }}
              >
                oskmitb.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ForgotPassword;

const main = {
  backgroundColor: "transparent",
};

const paragraph = {
  fontSize: 16,
  color: "#000000",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#62396C",
  borderRadius: 15,
  fontWeight: "bold",
  cursor: "pointer",
  margin: "0px 258px",
};

const buttonText = {
  color: "#FFFC83",
  fontWeight: "bold",
  fontSize: 16,
  margin: "10px 15px",
};

const content = {
  border: "1px solid #E5E5E5",
  borderRadius: 30,
  overflow: "hidden",
};

const boxInfos = {
  padding: "20px 40px",
};
