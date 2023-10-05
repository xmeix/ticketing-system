import "./TicketReply.css";

const TicketReply = ({ type }) => {
  return (
    <div className="ticket-reply">
      <form className="ticket-reply-form">
        <div className="form-title">
          {" "}
          {type === "new" ? "Créer un nouveau ticket" : "Réponds a ce ticket"}
        </div>
        {type === "new" && (
          <div className="form-group">
            <label htmlFor="reply-text">Objet</label>
            <input
              type="text"
              className="input-text"
              placeholder="Objet ticket"
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="reply-text">
            {type === "new" ? "Description" : "Remarques:"}
          </label>
          <textarea
            id="reply-text"
            name="reply-text"
            rows="4"
            placeholder="Type your reply here..."
          ></textarea>
        </div>
        {type === "new" && (
          <div className="form-group">
            <label htmlFor="deadline">Date limite:</label>
            <input type="date" id="deadline" name="deadline" />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="attachment">Pieces jointes:</label>
          <input type="file" id="attachment" name="attachment" />
        </div>
        <button type="submit">{type === "new" ? "Créer" : "Envoyer"}</button>
      </form>
    </div>
  );
};

export default TicketReply;
