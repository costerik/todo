import React, {ReactElement, SetStateAction} from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import {useSelector, useDispatch} from 'react-redux';

import style from './card.module.scss';
import {CardType} from './card.types';
import {ReturnRootStateType} from '../../reducers/reducers.types';
import {updateTask} from '../../reducers/tasks/actions';

function Card({
  placeholder = 'Enter a title for this card',
  titleText = 'Title',
  descriptionText = 'Description',
  stateText = 'State',
  title,
  edit = false,
  owner,
  onChangeValueText,
  description,
  state,
  _id,
}: CardType): ReactElement {
  const statesOption = useSelector((rootstate: ReturnRootStateType) =>
    rootstate.statesReducer.states?.map((e) => ({label: e.name, value: e._id})),
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);
  const [newDescription, setNewDescription] = React.useState(description);
  const [stateLocal, setStateLocal] = React.useState(() => {
    return statesOption?.find((s) => {
      const res = state?.name || '';
      return s.label === res;
    });
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
        {owner && (
          <div className={style.containerOwner}>
            <p className={style.owner}>{owner}</p>
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
            onSubmit={async (e): Promise<void> => {
              e.preventDefault();
              dispatch(
                updateTask({
                  title: newTitle,
                  description: newDescription,
                  state: stateLocal?.value,
                  id: _id as string,
                }),
              );
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
            <div className={style.containerButtons}>
              <button
                disabled={
                  !(
                    title?.trim() !== newTitle?.trim() ||
                    newDescription?.trim() !== description?.trim() ||
                    state?.name !== stateLocal?.label
                  )
                }
                className={style.updateButton}
                type="submit">
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Card;
