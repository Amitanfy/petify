import styles from "../styles/pages/Home.module.css";

export const Home = () => {
  return (
    <div className={styles.outer}>
      <div className={styles.dropdowns}>
        <p className={styles.dropdown}>ADOPT OR GET INVOLVED</p>
        <p className={styles.dropdown}>DOGS & PUPPIES</p>
        <p className={styles.dropdown}>CATS & KITTENS</p>
        <p className={styles.dropdown}>OTHER TYPES OF PETS</p>
      </div>
    </div>
  );
};
