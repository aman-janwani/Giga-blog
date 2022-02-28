import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useMoralis } from "react-moralis";
import Login from "../components/Login";
import { useState } from "react";
import Image from "next/image";

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePic, setImagePic] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const { isAuthenticated, Moralis, user } = useMoralis();

  if (!isAuthenticated) return <Login />;

  const AddImage = async (e) => {
    if (imagePic.type === "image/jpeg" || imagePic.type === "image/png") {
      const filename = imagePic.name.replace(/[^a-zA-Z ]/g, "");
      const file = new Moralis.File(filename, imagePic);
      await file.saveIPFS();
      console.log(file.ipfs(), file.hash());
      setImageUrl(file.hash());
      setImagePic([]);
      // return file.ipfs();
    } else {
      alert("We Support only 'jpeg' and 'png' images");
      setImagePic([]);
      return;
    }
  };

  const AddPost = (e) => {
    e.preventDefault();
    if (!title || !content || !imageUrl) return;

    const Post = Moralis.Object.extend("Posts");
    const post = new Post();

    post
      .save({
        title: title,
        content: content,
        image: imageUrl,
        ethAddress: user.get("ethAddress"),
        username: user.getUsername(),
        profilePic: user.get("UserProfilePic"),
      })
      .then(
        (message) => {
          // console.log("Post Saved");
        },
        (error) => {
          console.log(error.message);
        }
      );

    setImageUrl("");
    setImagePic([]);
    setTitle("");
    setContent("");
  };

  return (
    <div className="bg-white dark:bg-gigadark">
      <Head>
        <title>Giga Blog | Write</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/2.png" />
      </Head>
      <main className="flex flex-grow">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div>
            <form className="flex flex-col bg-gray-100 dark:bg-gigalightpurple p-10 m-5 rounded-xl">
              <input
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                placeholder="Title..."
                className="p-4 m-5 font-mono outline-none rounded-lg bg-gray-200 text-gigadark placeholder:text-gigadark text-xl dark:bg-gigadark dark:text-gray-100 dark:placeholder:text-gray-200"
              />
              <textarea
                required
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                placeholder="Type Your Story... (Markdown is supported)"
                cols="30"
                rows="10"
                className="p-4 m-5 font-mono outline-none rounded-lg bg-gray-200 text-gigadark placeholder:text-gigadark text-lg font-semibold dark:bg-gigadark dark:text-gray-100 dark:placeholder:text-gray-200"
              ></textarea>
              <div className="bg-gray-200 flex p-4 flex-col md:flex-row text-gigadark dark:bg-gigadark space-x-4 justify-center m-5 rounded-lg">
                <input
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const img = e.target.files[0];
                      setImagePic(img);
                    }
                  }}
                  required
                  type="file"
                  accept="image/png, image/jpeg"
                  className="bg-gigayellow rounded-lg p-3 font-mono font-semibold m-5"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    AddImage();
                    // console.log(imagePic);
                  }}
                  className="bg-gigayellow rounded-lg p-3 my-auto max-w-xs font-mono font-semibold"
                >
                  Upload
                </button>
                {imageUrl && (
                  <div className="my-auto p-2">
                    <Image
                      src={`https://gateway.moralisipfs.com/ipfs/${imageUrl}`}
                      width={100}
                      height={80}
                      className="rounded-xl my-auto"
                    />
                  </div>
                )}
              </div>
              <button
                onClick={AddPost}
                type="submit"
                className="bg-gigayellow p-3 text-gigadark text-2xl border-4 border-gigayellow hover:bg-transparent hover:text-white font-mono m-5 font-semibold rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Write;
