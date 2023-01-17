import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Repo Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          <div>
            <Link href="/login">
              <a>Click here to login and connect to your GitHub repo</a>
            </Link>
          </div>
        </p>
      </main>

      <Footer />
    </div>
  )
}