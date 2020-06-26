import React, {ReactElement, SetStateAction} from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import {useSelector, useDispatch} from 'react-redux';

/* actions */
import {updateTask, removeUserFromTask} from '../../reducers/tasks/actions';
import {addTaskToUser} from '../../reducers/users/actions';

/* types */
import {ReturnRootStateType} from '../../reducers/reducers.types';
import {CardType} from './card.types';

import style from './card.module.scss';

function Card({
  placeholder = 'Enter a title for this card',
  titleText = 'Title',
  descriptionText = 'Description',
  stateText = 'State',
  userText = 'User',
  removeUserText = 'Remove User',
  updateText = 'Update',
  title,
  edit = false,
  user,
  onChangeValueText,
  description,
  state,
  _id,
}: CardType): ReactElement {
  const statesOption = useSelector((rootstate: ReturnRootStateType) =>
    rootstate.statesReducer.states?.map((e) => ({label: e.name, value: e._id})),
  );
  const usersOption = useSelector((rootState: ReturnRootStateType) =>
    rootState.usersReducer.users?.map((u) => ({label: `${u.name} ${u.lastname}`, value: u._id})),
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);
  const [newDescription, setNewDescription] = React.useState(description);
  const [stateLocal, setStateLocal] = React.useState({
    value: state?._id as string,
    label: state?.name as string,
  });
  const [userLocal, setUserLocal] = React.useState({
    value: user && user._id,
    label: user && `${user.name} ${user.lastname}`,
  });

  const dispatch = useDispatch();

  function closeModal(): void {
    setIsOpen(false);
  }

  return (
    <div className={style.container}>
      <div
        onClick={(): void => {
          if (!edit) setIsOpen(true);
        }}>
        {user && (
          <div className={style.containerOwner}>
            <p className={style.owner}>
              {user.name} {user.lastname}
            </p>
          </div>
        )}
        {edit ? (
          <textarea
            className={style.textarea}
            placeholder={placeholder}
            onChange={(e): void => {
              if (onChangeValueText) onChangeValueText(e.target.value);
            }}
          />
        ) : (
          <p className={style.title}>{title}</p>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        style={{
          overlay: {
            background: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '30%',
          },
        }}>
        <div className={style.modalContainer}>
          <form
            onSubmit={(e): void => {
              console.log('submit');
              e.preventDefault();
              let update = false;
              const data: {
                title?: string;
                description?: string;
                state?: string;
                id: string;
              } = {id: _id as string};
              if (title?.trim() !== newTitle?.trim()) {
                update = true;
                data.title = newTitle;
              }
              if (newDescription?.trim() !== description?.trim()) {
                update = true;
                data.description = newDescription;
              }
              if (state?._id !== stateLocal?.value) {
                update = true;
                data.state = stateLocal.value;
              }
              if (update) {
                dispatch(updateTask(data));
              }
              if (user?._id !== userLocal.value) {
                dispatch(addTaskToUser({userId: userLocal.value as string, taskId: _id as string}));
              }
              closeModal();
            }}>
            <div className={style.cross}>
              <span onClick={closeModal}>X</span>
            </div>
            <label htmlFor="title">{titleText}</label>
            <input
              id="title"
              name="title"
              value={newTitle}
              onChange={(e): void => {
                e.preventDefault();
                setNewTitle(e.target.value);
              }}></input>
            <label htmlFor="description">{descriptionText}</label>
            <textarea
              id="description"
              name="description"
              value={newDescription}
              onChange={(e): void => {
                setNewDescription(e.target.value);
              }}></textarea>
            <label htmlFor="state">{stateText}</label>
            <Select
              className={style.select}
              id="state"
              name="state"
              value={stateLocal}
              options={statesOption}
              onChange={(e): void => {
                setStateLocal(e as SetStateAction<typeof stateLocal>);
              }}
            />
            <label htmlFor="user">{userText}</label>
            <Select
              className={style.select}
              id="user"
              name="user"
              value={userLocal}
              options={usersOption}
              onChange={(e): void => {
                setUserLocal(e as SetStateAction<typeof userLocal>);
              }}
            />
            <div className={style.containerButtons}>
              <button
                disabled={!user}
                onClick={(): void => {
                  dispatch(removeUserFromTask(_id as string));
                  closeModal();
                }}
                className={style.removeButton}
                type="button">
                {removeUserText}
              </button>
              <button
                disabled={
                  !(
                    title?.trim() !== newTitle?.trim() ||
                    newDescription?.trim() !== description?.trim() ||
                    state?._id !== stateLocal?.value ||
                    user?._id !== userLocal?.value
                  )
                }
                className={style.updateButton}
                type="submit">
                {updateText}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Card;
