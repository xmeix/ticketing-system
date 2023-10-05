import { useState } from "react";
import "./Ticket.css";
import TicketHeader from "./ticketHeader/TicketHeader";
import TicketContent from "./ticketContent/TicketContent";
import TicketReply from "./ticketReply/TicketReply";

const Ticket = ({ ticket, closePopup }) => {
  const [reply, setReply] = useState(false);
  return (
    <div className="ticket-popup">
      <TicketHeader />
      <TicketContent ticket={ticket} />
      <TicketReply />
    </div>
  );
};

export default Ticket;
