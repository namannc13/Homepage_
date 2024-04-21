import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "./theme/themeprovider";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <main className="p-2 overflow-y-auto mx-auto md:mx-12 lg:mx-24 xl:mx-44 2xl:mx-60">
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
    </ThemeProvider>
  );
}

export default App;
