import { ModeToggle } from "@/theme/modetoggle";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import {
  logoutUserFailure,
  logoutUserStart,
  logoutUserSuccess,
} from "@/Redux/user/userSlice";
import { Link } from "@phosphor-icons/react";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      dispatch(logoutUserStart());
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(logoutUserFailure(data.message));
        return;
      }
      dispatch(logoutUserSuccess(data));
    } catch (error) {
      dispatch(logoutUserFailure(error.message));
    }
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
          <Button onClick={handleLogOut} size="sm" variant="outline">
            LogOut
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
