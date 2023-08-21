import { Box, Button, Flex, Grid, Heading, Image } from "@chakra-ui/react";
import Card from "./TemporaryCard";
import TextInput from "../friends/TextInput";
import Navbar from "../Navbar";
import Footer from "../Footer";
import BackgroundAndNavbar from "../BackgroundAndNavbar";
import ListPage from "./ListPage";

/**
 * to do:
 *
 * 1. Make a temporary card component,
 *
 * 2. Make a temporary data to be mapped,
 *
 * 3. Make the structure:
 *
 * 3.1. Make a button '<' to go back to the page before this one.
 *
 * 3.2. Make the header for the entire content
 *
 * 3.3. Make a search bar component
 *
 * 3.4. Map the temporary data to be a list of cards.
 *
 * 4. Style the content.
 *
 *
 *
 * for scalability:
 *
 * (coming soon)
 */

export default function ListUnitPage() {
  return (
    <BackgroundAndNavbar bg="background-bsoukmhimp.svg">
      <ListPage
        title="UKM"
        description="Berikut ini adalah daftar UKM yang telah kamu kunjungi"
      />
    </BackgroundAndNavbar>
  );
}
