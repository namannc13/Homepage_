import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

export default function Auth() {
  return (
    <div className="mt-2">
      <Tabs defaultValue="login" className="w-full">
        <TabsList>
          <TabsTrigger value="login"> 
            Login
          </TabsTrigger>
          <TabsTrigger value="signup">
            Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="flex justify-between">
          <Login />
        </TabsContent>
        <TabsContent value="signup" className="flex justify-between">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
}
