import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMoralis, useMoralisQuery } from "react-moralis";
import Header from "../components/Header";
import Login from "../components/Login";
import MainScreen from "../components/MainScreen";
import Sidebar from "../components/Sidebar";
import Markdown from "../components/Markdown";
function Blog() {
  const { data, loading, error } = useMoralisQuery(
    "Posts",
    (query) => query.descending("createdAt"),
    [],
    {
      live: true,
    }
  );

  const router = useRouter();

  const { id } = router.query;

  const { isAuthenticated, logout } = useMoralis();

  if (!isAuthenticated) return <Login />;
  return (
    <div className="bg-white dark:bg-gigadark">
      <Head>
        <title>Giga Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/2.png" />
      </Head>
      <main className="flex flex-grow">
        <Sidebar />
        <div className="flex-1">
          <Header />
          {data.map((post) => {
            const WhichPost = post.id === id;
            if (WhichPost) {
              console.log(post);
              return (
                <div
                  key={post.id}
                  className="bg-gray-100 dark:bg-gigalightpurple p-5 m-5 rounded-xl max-w-5xl"
                >
                  <div className="text-center">
                    <Image
                      alt="postPic"
                      src={`https://gateway.moralisipfs.com/ipfs/${post.get(
                        "image"
                      )}`}
                      width={700}
                      height={450}
                      objectFit="cover"
                      className="rounded-xl"
                    />
                  </div>
                  <h1 className="text-gigadark mt-10 dark:text-white text-center text-5xl font-mono font-semibold">
                    {post.get("title")}
                  </h1>
                  <article className="prose prose-xl xl:prose-xl dark:prose-headings:text-gray-50 dark:prose-p:text-gray-200 dark:prose-strong:text-white dark:prose-a:text-white prose-a:underline dark:prose-ol:text-gray-100 dark:prose-ul:text-gray-100 prose-img:rounded-xl dark:prose-table:text-gray-100 dark:prose-em:text-gray-100 break-words mx-auto my-10">
                    <Markdown content={post.get("content")} />
                  </article>
                  <div className="flex space-x-4 m-5 mt-10 bg-gray-200 dark:bg-gigadark p-3 w-72 rounded-full">
                    <Image
                      alt="profilePic"
                      src={`https://gateway.moralisipfs.com/ipfs/${post.get(
                        "profilePic"
                      )}`}
                      height={70}
                      width={70}
                      objectFit="cover"
                      className="rounded-full"
                    />
                    <h1 className="text-gigadark dark:text-white text-lg font-mono font-semibold my-auto">
                      {post.get("username")}
                    </h1>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </main>
    </div>
  );
}

export default Blog;
