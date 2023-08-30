import React from "react";
import Layout from "~/layout";
import BackgroundAndNavbar from "~/components/BackgroundAndNavbar";
import { Center, Flex, Heading, Image, Button} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";


// Data Input
const inputUKMData: { [key: string]: string | undefined} = {
  nama: "LFM",
  logo: "/logo-ukm.png",
  usernametwitter: "@lfmitb",
  usernameinstagram: "@lfmitb",
  linktwitter: "https://twitter.com/lfmitb",
  linkinstagram: "https://www.instagram.com/lfmitb",
  detail:
`# **Deskripsi**
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



// Main Function
export default function UKMInfo() {
  const router = useRouter();
  return (
    <Layout title={`UKM: ${inputUKMData.nama}`}>
      <BackgroundAndNavbar bg="/background-bsoukmhimp.svg">
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
                fontSize="170%"
                color="yellow.5"
                textShadow="0px 4px 30px #72D8BA"
                textAlign="center"
                mb="10%"
              > 
                {inputUKMData.nama}
              </Heading>
              <Image
                alt="Logo"
                src={inputUKMData.logo}
                sizes="10%"
                mb="15%"
              />
              <Center>
                <Button
                  padding="8px 24px"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="12px"
                  background="yellow.5"
                  fontFamily="subheading"
                  fontSize="12px"
                  width="80%"
                  height="relative"
                  color="#4909b3"
                  onClick={() => router.push(`/404`)}
                  mb="15%"
                >
                  Tandai Kunjungan
                </Button>
              </Center>
            </Flex>
          </Center>
          <div style={{ textAlign: 'justify' }}>
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 style={{ fontFamily: "subheading", fontSize: "100%", marginBottom:"1%" }} {...props} />,
                p: ({ node, ...props }) => <p style={{ fontFamily: "body", fontSize: "80%", marginBottom:"5%"}} {...props} />,
                img: ({ node, ...props }) => {
                  if (props.alt === "instagram") {
                    return (
                      <p style={{ color: "#FFE655"}}>
                        <a href={inputUKMData.linkinstagram} style={{ display: "flex"}}>
                          <Image alt={props.alt} src={props.src} mb="2%" {...props} />
                          &nbsp; {inputUKMData.usernameinstagram}
                        </a>
                      </p>
                    );
                  } else if (props.alt === "Twitter") {
                    return (
                      <p style={{ color: "#FFE655"}}>
                        <a href={inputUKMData.linktwitter} style={{ display: "flex"}}>
                          <Image alt={props.alt} src={props.src} mb="2%" {...props} />
                          &nbsp; {inputUKMData.usernametwitter}
                        </a>
                      </p>
                    );
                  }
                  // Handle image 'Foto Kegiatan'
                  return (
                    <Image alt={props.alt} src={props.src} maxWidth="100%" height="auto" borderRadius="15px" mb="5%"{...props} />
                  );
                },
              }}
            >
              {inputUKMData.detail}
            </ReactMarkdown>
          </div>
        </Flex>
      </BackgroundAndNavbar>
    </Layout>
  );
}
