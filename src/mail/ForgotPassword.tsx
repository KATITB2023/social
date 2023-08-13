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
            <Img
              width={750}
              src="https://github.com/KATITB2023/social/assets/88751131/cc5648e3-e8b1-49ea-8159-7788b63dccb2"
            />

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
                // fontFamily: "SomarRounded-Regular",
              }}
            >
              © Orientasi Studi Keluarga Mahasiswa (OSKM) ITB 2023 {"  |  "}
              <Link
                href="https://oskmitb.com"
                style={{ color: "rgb(0,0,0, 0.7)" }}
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
