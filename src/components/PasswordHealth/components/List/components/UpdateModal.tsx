
import { FC, SyntheticEvent, useState } from 'react';
import Modal from 'react-modal';

import updateItem from '~/services/updateItem';

import './UpdateModal.scss';

interface IUpdateModal {
  item: IItem;
}

const UpdateModal: FC<IUpdateModal> = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [newPass, setNewPass] = useState('');

  Modal.setAppElement('body')

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateItem({
      ...item,
      password: newPass,
    })

    closeModal();
  }

  const closeModal = () => {
    setNewPass('');
    setShowModal(false)
  }

  return (
    <>
      <button className="update" onClick={() => setShowModal(true)}>
        Update Password
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal"
      >
        <h1>Update Password</h1>
        <form className="flex-col" onSubmit={handleSubmit}>
          <input
            placeholder="new password"
            className="input"
            value={newPass}
            onChange={(event) => setNewPass(event.target.value)}
          />
          <div className="pt-12px text-center">
            <button
              type="submit"
              className="button"
            >Change</button>

            <button
              className="button ml-12px"
              onClick={closeModal}
            >Cancel</button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default UpdateModal;
