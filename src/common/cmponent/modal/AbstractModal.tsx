import React from 'react'
import styled from 'styled-components'
import { CommonModalProps } from '../../CommonInterface'
import { ModalPortal } from './modal.portal'
import { AiOutlineClose } from 'react-icons/ai'
import { useOverflowModal } from '../../../hook/useOverflowHidden'
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
`
const ModalInner = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;
`

const Footer = styled.div`
  width: 100%;
  height: 91px;
  background-color: #fbfbfb;
  border-top: 1px solid #d8d8d8;
  padding: 20px 30px;
  position: absolute;
  bottom: 0;
  left: 0;
  @media all and (max-width: 1000px) {
    padding: 20px 15px;
  }
  > button {
    width: 170px;
    height: 50px;
    font-size: 16px;
    @media all and (max-width: 1000px) {
      width: 49.2%;
    }
  }
  .cancel_btn {
    border: 1px solid #d8d8d8;
    background-color: #fff;
    margin-right: 5px;
  }
  .confirm_btn {
    background-color: #8c8c8c;
    color: #fff;
  }
  .confirm_btn.on {
    background-color: #262626;
    color: #fff;
  }
`

const AbstractModal: React.FunctionComponent<CommonModalProps> = ({
  visible,
  children,
  onClose,
  confirmText = '확인',
  cancelText = '취소',
  title,
  onConfirm,
  canConfirm,
  mobileHeaderDisable = false,
}) => {
  const maskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target == e.currentTarget) {
      onClose()
    }
  }
  useOverflowModal(visible)
  return visible ? (
    <ModalPortal>
      <>
        <ModalOverlay onClick={maskClick} />
        <ModalInner>
          <div className="modal-header">
            <span className="title">{title}</span>
            <button className="close-btn" onClick={onClose}>
              <AiOutlineClose size={24} />
            </button>
          </div>
          <div className="inner-wrapper">{children}</div>
          <Footer>
            <button className="cancel_btn" onClick={onClose}>
              {cancelText}
            </button>
            <button className={`confirm_btn ${canConfirm ? 'on' : ''}`} onClick={onConfirm}>
              {confirmText}
            </button>
          </Footer>
        </ModalInner>
      </>
    </ModalPortal>
  ) : null
}

export default AbstractModal
