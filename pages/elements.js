import Link from "next/link";
import styles from "../styles/utils.module.scss";

export default function Elements() {
  return (
    <div className={styles.elements}>
      <h1>H1 Header</h1>
      <h3>H3 Header</h3>
      <p>Lorem ipsum text</p>
      <Link href="#">
        <a>Lorem ipsum link</a>
      </Link>{" "}
      <br />
      <input type="text" placeholder="lorem ipsum dolor" /> <br />
      <textarea
        cols="30"
        rows="5"
        placeholder="lorem ipsum dolor"
      ></textarea>{" "}
      <br />
      <button className={styles.pButton}>lorem ipsum dolor</button>
      <button className={styles.sButton}>lorem ipsum dolor</button>
      <button className={styles.tButton}>lorem ipsum dolor</button>
      <button className={styles.pButtonO}>lorem ipsum dolor</button>
      <button className={styles.sButtonO}>lorem ipsum dolor</button>
      <button className={styles.tButtonO}>lorem ipsum dolor</button>
      <div className={styles.sError}>lorem ipsum dolor</div>
      <div className={styles.sSucces}>lorem ipsum dolor</div>
      <div className={styles.sWarning}>lorem ipsum dolor</div>
    </div>
  );
}
