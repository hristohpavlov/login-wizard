import { useState } from 'react';
import '../styles/components/EditAttemptModal.css';
interface EditAttemptModalProps{
    attempt: any,
    onClose: any,
    onSubmit: any,
}
const EditAttemptModal = (props: EditAttemptModalProps) => {
  const [editedFields, setEditedFields] = useState({
    email: props.attempt.email || '',
    phone: props.attempt.phone || '',
    code: props.attempt.code || '',
    status: props.attempt.status || '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setEditedFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = () => {
    props.onSubmit(editedFields);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Attempt</h2>
        <div className="main-modal-container">
          <div className="modal-field-text">Email/Phone</div>
          <input className={`modal-input-field field-one`} type="text" name="email" value={editedFields.email || editedFields.phone} onChange={handleChange} />
          <div className="modal-field-text">Code    </div>
          <input className={`modal-input-field field-one`} type="text" name="code" value={editedFields.code} onChange={handleChange} />
          <div className="modal-field-text">Status    </div>
          <input className={`modal-input-field field-one`} type="text" name="status" value={editedFields.status} onChange={handleChange} />
          <div>
            <button className="continue-button-modal" onClick={handleSubmit}>Save Changes</button>
            <button className="signout-button" onClick={props.onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAttemptModal;