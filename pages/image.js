import React, { useState } from "react";
import Axios from "axios";
import { Image } from "cloudinary-react";

export default function image() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [fileSelected, setFileSelected] = useState("");

  const fileUpload = () => {
    const formData = new FormData();
    formData.append("file", fileSelected);
    formData.append("upload_preset", "mfddldmx");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dkkutz5oe/image/upload",
      formData
    ).then((res) => {});
  };

  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={(e) => setFileSelected(e.target.files[0])}
      />
      <button type="submit" onClick={fileUpload}>
        Upload
      </button>
      <Image
        cloudName="dkkutz5oe"
        alt="image"
        publicId="https://res.cloudinary.com/dkkutz5oe/image/upload/v1627156846/pdd7y3k3yps2qtq7aqo0.png"
      />
    </div>
  );
}
