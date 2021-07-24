import React, { useState } from "react";
import Modal from "react-modal";
import utilsStyles from "../../../../styles/utils.module.scss";
import styles from "./addpost.module.scss";
import { CgClose } from "react-icons/cg";
import { Formik, Form } from "formik";
import TextField from "../../../TextField";
import adminAddPost from "../../../../FormikValidations/adminAddPost";
import { useRouter } from "next/dist/client/router";
import http from "../../../../http-config";
import Loader from "../../../../components/Loader/Loader";

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

  const [fileSelected, setFileSelected] = useState();
  const [addedImage, setAddedImage] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSameData, setIsSameData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsOpen(true);
  const afterOpenModal = () => {};
  const closeModal = () => setIsOpen(false);

  const addPost = async (values) => {
    const allRes = await fetch(`${http}/api/admin/posts`);
    const allData = await allRes.json();

    const sameData = allData.data.find((d) => d.title === values.title);

    if (sameData) {
      setIsSameData(true);
    } else {
      const formData = new FormData();
      formData.append("file", fileSelected);
      formData.append("upload_preset", "mfddldmx");

      fetch("https://api.cloudinary.com/v1_1/dkkutz5oe/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.secure_url !== "") {
            values.postImage = `${data.url}`;

            const resPost = await fetch(`${http}/api/admin/posts`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });

            const postData = await resPost.json();
            if (postData.success == true) {
              setIsLoading(true);
              setIsSameData(false);
              setIsSuccess(true);
              values.title = "";
              values.description = "";
              values.file = "";
              Router.reload(window.location.pathname);
              setTimeout(() => {
                closeModal();
                setIsSuccess(false);
              }, 500);
            }
          }
        })
        .catch((err) => console.error(err));
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
              postImage: `${addedImage}`,
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
                {/* <TextField
                  label="Image"
                  name="postImage"
                  type="file"
                  onChange={(e) => setFileSelected(e.target.files[0])}
                /> */}
                <input
                  type="file"
                  name="postImage"
                  onChange={(e) => setFileSelected(e.target.files[0])}
                  id="file"
                  className={styles["file"]}
                />
                <label htmlFor="file">
                  {fileSelected ? fileSelected.name : "File"}
                </label>
                {isLoading ? (
                  <Loader />
                ) : (
                  <button type="submit" className={utilsStyles.tButton}>
                    Add
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
}
