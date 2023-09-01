import React from "react";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import { Center, Flex, Heading, Image, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { PopupInputCode } from "~/components/showcase/PopupInputCode";
import { api } from "~/utils/api";
import PopupVisitedCoin from "./PopupVisitedCoin";
import PopupWrongCode from "./PopupWrongCode";

/** TODO: HAPUS INI */
const dummyUKMData: { [key: string]: string | undefined } = {
  nama: "LFM",
  logo: "/logo-ukm.png",
  usernametwitter: "@lfmitb",
  usernameinstagram: "@lfmitb",
  linktwitter: "https://twitter.com/lfmitb",
  linkinstagram: "https://www.instagram.com/lfmitb",
  detail: `# **Deskripsi**
LFM (Liga Film Mahasiswa) ITB bersedia menjadi media partner untuk kegiatan dan acara oleh lembaga ITB dan membuka tawaran untuk pelaksanaan workshop jika dibutuhkan dan sesuai dengan timeline. LFM ITB menyediakan kelas dan diskusi yang dapat diikuti oleh umum untuk memberikan pengetahuan seputar perfilman dan fotografi.

# **Hari Jadi**
21 April 1960

# **Visi**
LFM ITB sebagai wadah kru berkomunitas dan berorganisasi yang bersifat kekeluargaan dan bergerak secara progresif.

# **Alamat Sekretariat**
CC Barat

# **Foto Kegiatan**
![Foto Kegiatan 1](/foto-kegiatan-ukm-1.png)
![Foto Kegiatan 2](/foto-kegiatan-ukm-2.png)

# **Media Sosial**
![instagram](/icon-instagram.png)
![Twitter](/icon-twitter.png)
`,
};

export const OrganizationPage = ({
  type,
  organizationId,
}: {
  type: string;
  organizationId: string;
}) => {
  const router = useRouter();
  const [visitPopup, setVisitPopup] = useState(false);
  const [visitedSuccess, setVisitedSuccess] = useState<boolean>(false);
  const [visitedFail, setVisitedFail] = useState<boolean>(false);
  const { data } = api.showcase.getUnitById.useQuery({ id: organizationId });

  return (
    <Layout title={`${type}: ${data?.name ?? ""}`}>
      <BackgroundAndNavbar bg="/background.png">
        {data ? (
          <>
            <Flex
              flexDirection="column"
              justifyContent="space-between"
              align-items="center"
              mx="5%"
              my="5%"
              position="relative"
            >
              <Image
                cursor={"pointer"}
                onClick={() => {
                  void router.back();
                }}
                alt="Back"
                src="/backbutton-detailukmhim.png"
                w={"24px"}
              />
              <Center>
                <Flex flexDirection="column">
                  <Heading
                    fontStyle="H3"
                    fontSize="200%"
                    color="yellow.5"
                    textShadow="0px 4px 30px #72D8BA"
                    textAlign="center"
                    mb="10%"
                  >
                    {data?.name}
                  </Heading>
                  <Image
                    alt="Logo"
                    src={data.image ?? "/logo_showcase.png"}
                    w="80%"
                    mb="15%"
                    mx={"auto"}
                  />
                  {!data?.visited && (
                    <Center>
                      <Button
                        padding="8px 24px"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="12px"
                        background="yellow.5"
                        fontFamily="subheading"
                        fontSize="12px"
                        width="60%"
                        height="relative"
                        color="#4909b3"
                        onClick={() => setVisitPopup(true)}
                        mb="15%"
                      >
                        Tandai Kunjungan
                      </Button>
                    </Center>
                  )}
                </Flex>
              </Center>
              <Flex textAlign={"justify"} flexDir={"column"}>
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }) => (
                      <h1
                        style={{
                          fontFamily: "subheading",
                          fontSize: "100%",
                          marginBottom: "1%",
                        }}
                        {...props}
                      />
                    ),
                    p: ({ ...props }) => (
                      <div
                        style={{
                          fontFamily: "body",
                          fontSize: "80%",
                          marginBottom: "5%",
                        }}
                        {...props}
                      />
                    ),
                    img: ({ ...props }) => {
                      if (props.alt === "instagram") {
                        return (
                          <div style={{ color: "#FFE655" }}>
                            <a
                              href={dummyUKMData.linkinstagram}
                              style={{ display: "flex" }}
                            >
                              <Image
                                alt={props.alt}
                                src={props.src}
                                mb="2%"
                                {...props}
                              />
                              &nbsp; {dummyUKMData.usernameinstagram}
                            </a>
                          </div>
                        );
                      } else if (props.alt === "Twitter") {
                        return (
                          <div style={{ color: "#FFE655" }}>
                            <a
                              href={dummyUKMData.linktwitter}
                              style={{ display: "flex" }}
                            >
                              <Image
                                alt={props.alt}
                                src={props.src}
                                mb="2%"
                                {...props}
                              />
                              &nbsp; {dummyUKMData.usernametwitter}
                            </a>
                          </div>
                        );
                      }
                      // Handle image 'Foto Kegiatan'
                      return (
                        <Image
                          alt={props.alt}
                          src={props.src}
                          maxWidth="100%"
                          height="auto"
                          borderRadius="15px"
                          mb="5%"
                          {...props}
                        />
                      );
                    },
                  }}
                >
                  {data?.bio}
                </ReactMarkdown>
              </Flex>
            </Flex>
            {visitedSuccess ? (
              <PopupVisitedCoin
                onClose={() => setVisitedSuccess(false)}
                isOpen={visitedSuccess}
              />
            ) : visitedFail ? (
              <PopupWrongCode
                onClose={() => setVisitedFail(false)}
                isOpen={visitedFail}
              />
            ) : (
              <PopupInputCode
                isOpen={visitPopup}
                onClose={() => setVisitPopup(false)}
                unitId={organizationId}
                setVisitedFail={setVisitedFail}
                setVisitedSuccess={setVisitedSuccess}
              />
            )}
          </>
        ) : (
          // Datanya ga ketemu
          // <NotFound/>
          <Flex />
        )}
      </BackgroundAndNavbar>
    </Layout>
  );
};
