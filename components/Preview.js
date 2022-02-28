import Image from "next/image";
import { useRouter } from "next/router";

function Preview({ post }) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push({
          pathname: "/blog",
          query: {
            id: post.id,
          },
        });
      }}
      className="flex m-1 sm:m-5 overflow-scroll p-5 border-2 border-gray-300 dark:border-gray-700 font-mono bg-gray-100 dark:bg-gigalightpurple rounded-xl cursor-pointer hover:brightness-95 dark:hover:brightness-125 text-gigadark dark:text-white"
    >
      <div className="flex-1">
        <h1 className="text-3xl font-semibold mb-4">{post.get("title")}</h1>
        <p className="truncate w-96">{post.get("content")}</p>
        <div className="mt-5 flex flex-row space-x-2">
          <Image
            alt="profilePic"
            src={`https://gateway.moralisipfs.com/ipfs/${post.get(
              "profilePic"
            )}`}
            height={30}
            width={30}
          />
          <p className="text-gray-600 dark:text-gray-200 font-bold text-md my-auto">
            {post.get("username")}
          </p>
        </div>
      </div>
      <div className="hidden md:block">
        <Image
          alt="postPic"
          src={`https://gateway.moralisipfs.com/ipfs/${post.get("image")}`}
          height={130}
          className="rounded-xl"
          width={200}
          objectFit="cover"
        />
      </div>
    </div>
  );
}

export default Preview;
