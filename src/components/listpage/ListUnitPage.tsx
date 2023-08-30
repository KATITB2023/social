import BackgroundAndNavbar from "../BackgroundAndNavbar";
import ListPage from "./ListPage";
import {useRouter} from "next/router";

export default function ListUnitPage() {
  const router = useRouter();
  return (
    <BackgroundAndNavbar bg="/background.png">
      <ListPage title={router.asPath.split("/").pop()!.toUpperCase()} withbackbutton={true}/>
    </BackgroundAndNavbar>
  );
}
