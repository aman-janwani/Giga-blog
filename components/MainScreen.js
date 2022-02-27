import Image from "next/image";
import Preview from "./Preview";
import { useMoralisQuery } from "react-moralis";

function MainScreen() {
  const { data, loading, error } = useMoralisQuery(
    "Posts",
    (query) => query.descending("createdAt"),
    [],
    {
      live: true,
    }
  );

  return (
    <div className="max-h-screen overflow-y-scroll">
      {data.map((post) => (
        <Preview key={post.id} post={post} />
      ))}
    </div>
  );
}

export default MainScreen;
