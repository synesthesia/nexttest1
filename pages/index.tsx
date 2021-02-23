import { AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { SignInButton, SignOutButton } from "../src/LoginControls";
import { useClaims } from "../src/useClaims";
import { useState,  useEffect } from "react";


export default function Home() {

  var claims = useClaims();

  useEffect(() => console.log(claims), [claims])

  return (
    
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <AuthenticatedTemplate>
        <p className={styles.description}>
        <a href="/profile">Click these words to see User Profile</a>, or...
        </p>
        <SignOutButton />
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
        <SignInButton loginType={"popup"}/>
        <SignInButton loginType={"redirect"}/>
        </UnauthenticatedTemplate>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>       
         </div>
         
      </main>

      <footer className={styles.footer}>
        The footer
      </footer>
    </div>
  )
}
