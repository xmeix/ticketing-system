import { useRef, useState } from "react";
import "./TicketReply.css";
import { useDispatch } from "react-redux";
import { createTicket } from "../../../store/apiCalls/ticket";

const TicketReply = ({ type }) => {
  const objectRef = useRef();
  const descriptionRef = useRef();
  const deadlineRef = useRef();
  const attachmentRef = useRef();
  const [selectedFilesCount, setSelectedFilesCount] = useState(0);
   const dispatch = useDispatch();

  const handleFileInputChange = () => {
    const files = attachmentRef.current.files;

    setSelectedFilesCount(files.length);

    // const names = Array.from(files).map((file) => file.name);
    // setSelectedFileNames(names);
  };

  const handleTicketAction = () => {
    // console.log("Description:", descriptionRef.current.value);
    // console.log("Deadline:", deadlineRef.current.value);

    let selectedAttachment = null;
    if (selectedFilesCount > 0) {
      selectedAttachment = attachmentRef.current.files[0];  
    }

    if (type === "new") {
      // console.log("It's a ticket form");
      // console.log("Object:", objectRef.current.value);
      dispatch(
        createTicket({
          objet: objectRef.current.value,
          description: descriptionRef.current.value,
          deadline: deadlineRef.current.value,
          attachment: selectedAttachment, 
        })
      );
    } else {
      console.log("It's a reply on a ticket");
      console.log("Object:", "Re:");
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
            {selectedFilesCount > 0 ? (
              <div className="files-selected">
                <div className="files-number">{`fichier sélectionné:`}</div>

                <div className="file-name">
                  {"- " + attachmentRef.current.files[0].name}
                </div>
              </div>
            ) : (
              ""
            )}
          </label>
          <input
            type="file"
            id="attachment"
            name="attachment"
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
