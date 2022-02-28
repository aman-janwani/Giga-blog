import Head from "next/head";
import Login from "../components/Login";
import { useMoralis } from "react-moralis";
import Sidebar from "../components/Sidebar";
import MainScreen from "../components/MainScreen";
import Header from "../components/Header";

export default function Home() {
  const { isAuthenticated, logout } = useMoralis();

  if (!isAuthenticated) return <Login />;
  return (
    <div className="bg-white dark:bg-gigadark">
      <Head>
        <title>Giga Blog | Feed</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/2.png" />
      </Head>
      <main className="flex flex-grow">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <MainScreen />
        </div>
      </main>
    </div>
  );
}
