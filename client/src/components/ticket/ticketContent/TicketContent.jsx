import "./TicketContent.css";
const TicketContent = ({ ticket }) => {
  return (
    <div className="ticket-content">
      <div className="ticket-objet">
        <span>objet:</span> {ticket.objet}
      </div>
      <div className="ticket-description">
        <span>description:</span>
        <br />
        {ticket.description}
      </div>
      <div className="ticket-piece-jointes"></div>
    </div>
  );
};

export default TicketContent;
