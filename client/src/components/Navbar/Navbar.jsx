import { ModeToggle } from "@/theme/modetoggle";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Redux/user/userSlice";
import { Link } from "@phosphor-icons/react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    dispatch(logoutUser());
  };
  return (
    <nav className="backdrop-blur-sm p-2 xl:mx-auto sticky top-0 z-50 border-b">
      <div className="flex items-center justify-between gap-2 mx-auto md:mx-12 lg:mx-24 xl:mx-44 2xl:mx-60">
        <div className="flex items-center gap-2">
          <Link size={20} weight="bold" />
          <h1 className="font-bold text-lg">Links</h1>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {currentUser && (
            <Button onClick={handleLogOut} size="sm" variant="outline">
              LogOut
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
