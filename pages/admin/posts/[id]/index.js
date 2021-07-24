import Navbar from "../../../../components/admin/Navbar/Navbar";
import styles from "../../../../pages/admin/posts/posts.module.scss";
import http from "../../../../http-config";

function Index({ post }) {
  console.log(post);
  return (
    <div>
      <Navbar />
      {post && (
        <div className={styles.postsContainer}>
          <div className={styles.posts}>
            <div className={styles.post} key={post._id}>
              <h3>{post.data.title}</h3>
              <p>{post.data.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${http}/api/admin/posts/${context.query.id}`);
  const post = await res.json();

  return {
    props: { post },
  };
}

export default Index;
