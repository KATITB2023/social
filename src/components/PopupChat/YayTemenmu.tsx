import React, { FC } from "react";
import Popup from "~/components/PopupChat/PopUp";

const YayTemanmu = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <Popup
        content1="Yay"
        content2="temenmu"
        content3="udah reveal"
        content4="profil nih!"
        setOpen={setOpen}
      />
    </div>
  );
};

export default YayTemanmu;
