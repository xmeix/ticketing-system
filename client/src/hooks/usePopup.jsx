import { useState } from "react";
import Ticket from "../components/ticket/Ticket";

const usePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [type, setType] = useState("ticket");
  const openPopup = (data, type) => {
    console.log("data popup", data);
    setIsOpen(true);
    setData(data);
    setType(type);
  };

  const closePopup = () => {
    setIsOpen(false);
    setData(null);
  };

  const Popup = () => {
    return isOpen ? (
      <Ticket ticket={data} closePopup={closePopup} type={type} />
    ) : null;
  };

  return { openPopup, closePopup, Popup, isOpen };
};

export default usePopup;
