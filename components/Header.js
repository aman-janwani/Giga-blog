import { useMoralis } from "react-moralis";
import { BsFillPencilFill, BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";
import Link from "next/link";
import useDarkMode from "../hooks/useDarkMode";
import { MdOutlineFeed } from "react-icons/md";

function Header() {
  const { logout } = useMoralis();
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <div className="sticky flex justify-between bg-white dark:bg-gigadark shadow-lg h-20 p-2">
      <div className="flex space-x-5">
        <Link href="/">
          <div className="p-2 w-16 sm:w-32 md:w-48 text-center my-auto text-lg flex lg:hidden justify-center space-x-2 rounded-2xl cursor-pointer text-gigadark bg-gray-300 dark:text-white dark:bg-gigalightpurple hover:brightness-105">
            <MdOutlineFeed className="my-auto" />
            <h1 className="font-mono font-semibold hidden sm:block">My Feed</h1>
          </div>
        </Link>
        <Link href="/write">
          <div className="p-2 w-16 sm:w-32 md:w-48 text-lg flex lg:hidden my-auto justify-center space-x-3 text-center rounded-2xl cursor-pointer text-gigadark bg-gigayellow hover:brightness-125">
            <BsFillPencilFill className="my-auto" />
            <h1 className="font-mono font-semibold hidden sm:block">Write</h1>
          </div>
        </Link>
      </div>
      <div className="flex">
        <div className="my-auto mx-3 md:mx-10">
          {colorTheme === "light" ? (
            <BsFillSunFill
              onClick={() => setTheme("light")}
              className="cursor-pointer text-gigayellow text-xl"
            />
          ) : (
            <BsFillMoonFill
              onClick={() => setTheme("dark")}
              className="cursor-pointer text-gigadark text-xl"
            />
          )}
        </div>
        <div className="my-auto mx-0 md:mx-10">
          <button
            className="bg-gigayellow px-3 sm:px-6 py-2 text-center text-gigadark rounded-lg text-sm sm:text-lg font-medium border-2 border-gigayellow hover:bg-transparent dark:hover:text-white hover:text-gigadark"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
