import React from "react";
import Modal from 'react-modal';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Button from "../Button/Button";
import { closeBetaModal } from "../Editor/EditorSlice";
import '../../Modal.scss';

const BetaModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  
  const isModalOpen = useSelector((state) => state.editor.betaModalShowing)
  const closeModal = () => dispatch(closeBetaModal());

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className='modal-content'
        overlayClassName='modal-overlay'
        contentLabel="Rename File"
        parentSelector={() => document.querySelector('#app')}
        appElement={document.getElementById('app') || undefined}
      >
        <h2 className='modal-content__heading'>{t('betaBanner.modal.heading')}</h2>

        <h3 className='modal-content__subheading'>{t('betaBanner.modal.meaningHeading')}</h3>
        <p className='modal-content__text'>{t('betaBanner.modal.meaningText')}</p>

        <h3 className='modal-content__subheading'>{t('betaBanner.modal.whatNextHeading')}</h3>
        <p className='modal-content__text'>{t('betaBanner.modal.whatNextText')}</p>

        <div className='modal-content__buttons' >
          <Button className='btn--primary' buttonText={t('betaBanner.modal.close')} onClickHandler={closeModal} />
        </div>
      </Modal>
    </>
  );
}

export default BetaModal;
