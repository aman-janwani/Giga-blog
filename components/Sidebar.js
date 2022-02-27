import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { MdOutlineFeed } from "react-icons/md";
import { useMoralis } from "react-moralis";

function Sidebar() {
  const { user } = useMoralis();
  return (
    <div className="hidden lg:flex flex-col min-h-screen w-72 p-4 bg-gray-100 dark:bg-gigalightpurple">
      <div className="relative h-32 w-28 mx-auto">
        <Image src="/assets/3.png" layout="fill" />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="">
          <Link href="/">
            <div className="p-2 text-center flex justify-center space-x-2  mt-5 rounded-2xl cursor-pointer text-gigadark bg-gray-300 dark:text-white dark:bg-gigadark hover:brightness-105">
              <MdOutlineFeed className="my-auto text-2xl" />
              <h1 className="text-lg font-semibold">My Feed</h1>
            </div>
          </Link>
          <Link href="/write">
            <div className="p-2 text-xl flex justify-center space-x-3 text-center mt-5 rounded-2xl cursor-pointer text-gigadark bg-gigayellow hover:brightness-125">
              <BsFillPencilFill className="my-auto" />
              <h1 className="text-xl font-semibold">Write</h1>
            </div>
          </Link>
        </div>
        <Link href="/profile">
          <div className="cursor-pointer flex flex-row justify-evenly rounded-3xl p-2 bg-gray-50 dark:bg-gigadark border-2 border-gigayellow">
            {user.get("UserProfilePic") ? (
              <Image
                src={user.get("UserProfilePic")}
                height={50}
                width={50}
                objectFit="contain"
                className="rounded-full"
              />
            ) : (
              <Image
                src={"/assets/6.png"}
                height={50}
                width={50}
                objectFit="contain"
              />
            )}
            <div>
              <h1 className="text-gigadark dark:text-white text-lg font-medium font-mono w-40 truncate ">
                {user.getUsername()}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-medium font-mono w-36 truncate">
                {user.get("ethAddress")}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
