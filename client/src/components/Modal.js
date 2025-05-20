import React from "react";
import { Modal } from "antd";

const ModalOpen = (props) => {
  const {
    modalBegin,
    resetValues,
    running,
    titleModal,
    form,
    user,
    design,
    isDelete,
    okDelete,
    onFinishUpdate,
    onFinishLoan,
    onFinishReturn,
    selectedRow,
    footer,
  } = props;

  return (
    <Modal
      title={titleModal}
      okButtonProps={design}
      centered
      footer={footer}
      open={modalBegin}
      onOk={async () => {
        if (isDelete) {
          await okDelete(selectedRow[0]);
        }
        if(onFinishUpdate){
          await onFinishUpdate(selectedRow);
        }
        if(onFinishLoan){
          await onFinishLoan(selectedRow,user,running);
        }
        if(onFinishReturn){
          await onFinishReturn(selectedRow,user,running);
        }
        running(false);
        resetValues();
      }}
      onCancel={() => {
        running(false);
        resetValues();
      }}
    >
      {form}
    </Modal>
  );
};

export default ModalOpen;