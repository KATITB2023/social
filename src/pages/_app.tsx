import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  test: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

export const theme = extendTheme({
  fonts: {
    heading: "Bodwars",
    body: "SomarRounded-Regular",
    subheading: "SomarRounded-Bold",
  },
  components: {
    Heading: {
      baseStyle: {},
      sizes: {
        H1: {
          fontSize: "64px",
        },
        H2: {
          fontSize: "48px",
        },
        H3: {
          fontSize: "32px",
        },
        H4: {
          fontSize: "24px",
        },
        H5: {
          fontSize: "20px",
        },
        H6: {
          fontSize: "16px",
        },
        SH1: {
          fontSize: "36px",
          fontFamily: "subheading",
        },
        SH2: {
          fontSize: "32px",
          fontFamily: "subheading",
        },
        SH3: {
          fontSize: "24px",
          fontFamily: "subheading",
        },
        SH4: {
          fontSize: "20px",
          fontFamily: "subheading",
        },
        SH5: {
          fontSize: "16px",
          fontFamily: "subheading",
        },
      },
      variants: {},
      defaultProps: { lineHeight: "120%", size: "H4" },
    },
    Text: {
      sizes: {
        B1: { fontSize: "24px" },
        B2: { fontSize: "20px" },
        B3: { fontSize: "16px" },
        B4: { fontSize: "14px" },
        B5: { fontSize: "12px" },
        A: { fontSize: "10px" },
      },
      defaultProps: { lineHeight: "120%", size: "B4" },
    },
  },
  colors: {
    white: "#FFFFFF",
    black: "#0B0A0A",
    gray: {
      200: "#F9F9F9",
      300: "#BFBFBF",
      400: "#9B9B9B",
      500: "#777676",
      600: "#2F2E2E",
    },
    navy: {
      1: "#1D0263",
      2: "#2B0792",
      3: "#3608C0",
      4: "#3F2CEB",
      5: "#4A58F6",
    },
    pink: {
      1: "#CE04A1",
      2: "#E935B8",
      3: "#F74DC1",
      4: "#FF67C3",
      5: "#FF93D1",
    },
    yellow: {
      1: "#E77A23",
      2: "#F79A2E",
      3: "#FFBE3B",
      4: "#FFE655",
      5: "#FFFC83",
    },
    green: {
      1: "#117584",
      2: "#1C939A",
      3: "#2FC1AD",
      4: "#72D8BA",
      5: "#C0EACA",
    },
    purple: {
      1: "#340C8F",
      2: "#4909B3",
      3: "#651CCE",
      4: "#7B34E1",
      5: "#8D47E5",
    },
    orange: "#E85535",
  },
  styles: {
    global: {
      body: {
        bg: "#12122E",
        color: "white",
      },
    },
  },
});

// DESIGN SYSTEM TYPOGRAPHY:
// Now you can use component Heading and Text for designed system typography.
/* 
ex: 
for heading and subheading, use:
<Heading size="H1"> some heading </Heading>
<Heading size="SH1"> some subheading </Heading>
<Heading> some heading <Heading> // default is -> size="H4"

and
for body and additional, use:
<Text size= "B1"> Some body text </Text>
<Text size = "A"> some additional text <Text>
<Text>Default for text is -> size = "B4" </Text>
*/

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
