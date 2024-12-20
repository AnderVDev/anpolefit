import { SelectedPage } from "@/lib/types";
import Link from "./Link";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const navbarBackground = isTopOfPage ? "" : "bg-lightpurple drop-shadow bg-opacity-90 py-6";
  const button_menu = "bg-hotpink rounded-full text-lg text-white px-6";

  return (
    <nav className="w-10/12">
      <div className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-8`}>
        <div className={`${flexBetween}  mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            
            {/* LEFT SIDE NAVBAR */}
            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full`}>
                <div className={`${flexBetween} gap-8 text-xl`}>
                  <Link
                    page="Home"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Link
                    page="About Us"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Link
                    page="Classes"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                </div>

                {/* RIGHT SIDE NAVBAR */}
                <div className={`${flexBetween} gap-8 text-xl`}>
                <div className={`${button_menu} gap-8`}>
                  <a href="/login">Become a Member</a>
                </div> 
                <div className={`${button_menu} gap-8`}>
                  <a href="/login">Sign In</a>
                </div>
                </div>
              </div>
            ) : (
              <button
              className={` gap-8`}
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <aside className="fixed bottom-0 left-0 z-40 h-full w-[220px] bg-lightpurple bg-opacity-90 drop-shadow-xl">
          {/* CLOSE ICON */}
          <figure className="flex justify-end p-8">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-10 w-10 text-darkpurple hover:transition ease-in-out hover:rotate-[45deg]" />
            </button>
          </figure>
          {/* MENU ITEMS */}
          <div className="ml-[25%] flex flex-col gap-8 text-2xl">
            <Link
              page="Home"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link
              page="Benefits"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link
              page="Our Classes"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link
              page="Contact Us"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>
        </aside>
      )}
    </nav>
  );
};

export default Navbar;

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", handler);

    return () => {
      mediaQueryList.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
}
