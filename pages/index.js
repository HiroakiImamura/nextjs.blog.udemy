import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from  "next/link"
import Layout, { siteTitle } from '../components/layout'
import utilStyle from "../styles/utils.module.css"
import { getPostdata } from "../lib/post";



//SSGの場合
export async function getStaticProps() {
  const allPostData = getPostdata();
  console.log(allPostData);
  return {
    props: {
      allPostData,
    },
  };
}

export default function Home({ allPostData }) {
  return (
  <Layout home>

     <Head>
       <title>{siteTitle}</title>
      </Head>
    <section className={utilStyle.headingMd}>
      <p>
        私はフルスタックエンジニアです。好きなフレームワークはnex.jsです。
      </p>
    </section>

    <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
      <h2>📝エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostData.map(({id,title,date,thumbnail}) => (
          <article key={id}>
          <Link href={`/posts/${id}`}>
            <Image src={`${thumbnail}`} className={styles.thumbnailImage} />
          </Link>
          <br />
          
          <a href={`/posts/${id}`} className={utilStyle.boldText}>
              {title}
          </a>
          <br />
          
          <small className={utilStyle.lightText}>
            {date}
          </small>
          </article>
        ))}
       

      
      </div>
    </section>
    

  </Layout>
  );
}
