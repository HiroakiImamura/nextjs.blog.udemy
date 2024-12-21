import Head from "next/head";
import styles from "./layout.module.css"
import utilStyles from "../styles/utils.module.css"
import Image from "next/image";
import Link from "next/link";
const name = "Hiroaki Code"
export const siteTitle = "Next.js Blog"

export default function Layout({ children,home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel='icon' href="favicon.ico" />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <Image className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`} src="/images/profile.png" />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Image className={`${utilStyles.borderCircle}`} src="/images/profile.png" />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                )}
                
            </header>
            <main>
                {children}
            </main>
            {!home && (
                <div>
                    <Link href="/">← ホームへ戻る</Link>
                </div>
            )}
        </div>
    );
}   