import React from "react";
import Popup from "~/components/PopupChat/PopUp";

const BerhasilRequest = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <Popup
        content1="Berhasil"
        content2="request"
        content3="teman untuk"
        content4="reveal profil!"
        setOpen={setOpen}
      />
    </div>
  );
};

export default BerhasilRequest;
