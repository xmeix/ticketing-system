import { useRef, useState } from "react";
import "./TicketReply.css";
import { useDispatch } from "react-redux";
import {
  createReply,
  createTicket,
  getTickets,
} from "../../../store/apiCalls/ticket";

const TicketReply = ({ type, ticket }) => {
  const objectRef = useRef();
  const descriptionRef = useRef();
  const deadlineRef = useRef();
  const attachmentRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const emptyFields = () => {
    objectRef.current.value = "";
    descriptionRef.current.value = "";
    deadlineRef.current.value = "";
    setSelectedFile(null);
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleTicketAction = async () => {
    let form_data = new FormData();
    if (selectedFile) {
      form_data.append("piecesjointes", selectedFile);
    }
    form_data.append("description", descriptionRef.current.value);

    if (type === "new") {
      console.log("here");

      form_data.append("deadline", deadlineRef.current.value);
      form_data.append("objet", objectRef.current.value);

      await dispatch(createTicket(form_data));
      await dispatch(getTickets());
      emptyFields();
    } else {
      console.log("here");

      form_data.append("objet", `Re: ${ticket?.objet}`);
      dispatch(
        createReply({
          id: ticket?.id,
          reply: form_data,
        })
      );
    }
  };

  return (
    <div className="ticket-reply">
      <div className="ticket-reply-form">
        <div className="form-title">
          {type === "new" ? "Créer un nouveau ticket" : "Réponds à ce ticket"}
        </div>
        {type === "new" && (
          <div className="form-group">
            <label htmlFor="reply-text">Objet</label>
            <input
              type="text"
              className="input-text"
              placeholder="Objet ticket"
              ref={objectRef}
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
            placeholder="Description de ticket..."
            ref={descriptionRef}
          ></textarea>
        </div>
        {type === "new" && (
          <div className="form-group">
            <label htmlFor="deadline">Date limite:</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              ref={deadlineRef}
              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="attachment">
            {selectedFile ? (
              <div className="files-selected">
                <div className="files-number">{`fichier sélectionné:`}</div>
                <div className="file-name">{"- " + selectedFile.name}</div>
              </div>
            ) : (
              ""
            )}
          </label>
          <input
            type="file"
            id="attachment"
            name="piecesjointes"
            ref={attachmentRef}
            onChange={handleFileInputChange}
          />
        </div>

        <button type="submit" onClick={handleTicketAction}>
          {type === "new" ? "Créer" : "Envoyer"}
        </button>
      </div>
    </div>
  );
};

export default TicketReply;
