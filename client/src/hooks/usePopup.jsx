import { useState } from "react";
import Ticket from "../components/ticket/Ticket";

const usePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const openPopup = (data) => {
    setIsOpen(true);
    setData(data);
  };

  const closePopup = () => {
    setIsOpen(false);
    setData(null);
  };

  const Popup = () => {
    return isOpen ? <Ticket ticket={data} closePopup={closePopup} /> : null;
  };

  return { openPopup, closePopup, Popup, isOpen };
};

export default usePopup;
