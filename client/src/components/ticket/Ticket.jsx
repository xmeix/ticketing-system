import { useState } from "react";
import "./Ticket.css";
import TicketHeader from "./ticketHeader/TicketHeader";
import TicketContent from "./ticketContent/TicketContent";
import TicketReply from "./ticketReply/TicketReply";

const Ticket = ({ ticket, closePopup }) => {
  const [reply, setReply] = useState(false);
  const [role, setRole] = useState("ADZ");
  return (
    <div className="ticket-popup">
      <TicketHeader closePopup={closePopup} setReply={setReply} />
      <TicketContent ticket={ticket} />
      {reply && role === "ADZ" && <TicketReply />}
    </div>
  );
};

export default Ticket;
