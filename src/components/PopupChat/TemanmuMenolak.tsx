import React from "react";
import Popup from "~/components/PopupChat/PopUp";

const TemanmuMenolak = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <Popup
        content1="Temanmu"
        content2="menolak"
        content3="reveal profil"
        content4=":("
        setOpen={setOpen}
      />
    </div>
  );
};

export default TemanmuMenolak;
