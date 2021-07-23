import React, { useState } from "react";
import Modal from "react-modal";
import utilsStyles from "../../../../styles/utils.module.scss";
import styles from "./addpost.module.scss";
import { CgClose } from "react-icons/cg";
import { Formik, Form } from "formik";
import TextField from "../../../TextField";
import adminAddPost from "../../../../FormikValidations/adminAddPost";
import { useRouter } from "next/dist/client/router";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function AddPost() {
  const Router = useRouter();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSameData, setIsSameData] = useState(false);

  const openModal = () => setIsOpen(true);
  const afterOpenModal = () => {};
  const closeModal = () => setIsOpen(false);

  const addPost = async (values) => {
    const allRes = await fetch("http://localhost:3000/api/admin/posts");
    const allData = await allRes.json();

    const sameData = allData.data.find((d) => d.title === values.title);

    if (sameData) {
      setIsSameData(true);
    } else {
      const res = await fetch("http://localhost:3000/api/admin/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.success == true) {
        setIsSameData(false);
        setIsSuccess(true);
        values.title = "";
        values.description = "";
        Router.reload(window.location.pathname);
        setTimeout(() => {
          closeModal();
          setIsSuccess(false);
        }, 500);
      }
    }
  };

  return (
    <div>
      <button onClick={openModal} className={utilsStyles.tButton}>
        Add Post
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className={styles.modalContainer}>
          <div className={styles.header}>
            <h3>Add Post</h3>
            <div className={styles.closeModalButton} onClick={closeModal}>
              <CgClose size="20" />
            </div>
          </div>
          {isSuccess && <div className={utilsStyles.sSucces}>Success!</div>}
          {isSameData && (
            <div className={utilsStyles.sError}>
              This data is already exists!
            </div>
          )}
          <Formik
            initialValues={{
              title: "",
              description: "",
            }}
            validationSchema={adminAddPost}
            onSubmit={(values) => addPost(values)}
          >
            {(formik) => (
              <Form className={styles.form}>
                <TextField
                  label="Title"
                  name="title"
                  type="text"
                  isInput={true}
                />
                <TextField
                  label="Description"
                  name="description"
                  type="text"
                  isInput={false}
                />
                <button type="submit" className={utilsStyles.tButton}>
                  Add
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
}
