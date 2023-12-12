import Link from 'next/link';
import Image from 'next/image';
import styles from './scss/geography.module.css';
import { useRouter } from 'next/router';

const Geography = () => {
  const router = useRouter();
  const currentRoute = router ? router.pathname : '/';

  return (
    <>
      <div className={styles.geo_container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <h1>시군별 CHAK 상품권 사용 현황</h1>
          </div>
          <select name="" id="" className={styles.un_pageItemSelect}>
            <option value="10" className={styles.item}>
              딩해년도
            </option>
            <option value="20" className={styles.item}>
              20개씩 보기
            </option>
            <option value="30" className={styles.item}>
              30개씩 보기
            </option>
          </select>
          <div className={styles.geo_canvas_div}>
            <canvas className={styles.geo_canvas_widget}></canvas>
          </div>
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  );
};

export default Geography;
