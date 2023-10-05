import "./TicketReply.css";

const TicketReply = () => {
  return (
    <div className="ticket-reply">
      <form className="ticket-reply-form">
        <div className="form-group">
          <label htmlFor="reply-text">Remarques:</label>
          <textarea
            id="reply-text"
            name="reply-text"
            rows="4"
            placeholder="Type your reply here..."
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="attachment">Pieces jointes:</label>
          <input type="file" id="attachment" name="attachment" />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default TicketReply;
