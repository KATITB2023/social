import { Button, Image } from "@chakra-ui/react";
import Card from "./TemporaryCard";

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
const defaultData = [
  {
    image: "",
    name: "LFM",
  },
  {
    image: "",
    name: "URO",
  },
  {
    image: "",
    name: "8EH",
  },
  {
    image: "",
    name: "KSEP1",
  },
  {
    image: "",
    name: "KSEP2",
  },
  {
    image: "",
    name: "KSEP3",
  },
  {
    image: "",
    name: "KSEP4",
  },
  {
    image: "",
    name: "KSEP5",
  },
  {
    image: "",
    name: "KSEP6",
  },
  {
    image: "",
    name: "KSEP7",
  },
  {
    image: "",
    name: "KSEP8",
  },
  {
    image: "",
    name: "KSEP9",
  },
  {
    image: "",
    name: "KSEP10",
  },
];
export default function ListUnitPage() {
  return (
    <>
      <Button>
        <Image src="backbutton-logo.svg" alt="<"></Image>
      </Button>
      <Card></Card>
    </>
  );
}
