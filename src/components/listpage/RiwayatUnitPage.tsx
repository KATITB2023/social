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

export default function RiwayatUnitPage({ title }: { title: string }) {
  return (
    <BackgroundAndNavbar bg="/background.png">
      <ListPage
        title={title}
        description={`Berikut ini adalah daftar ${title} yang telah kamu kunjungi`}
        withbackbutton={true}
      />
    </BackgroundAndNavbar>
  );
}
