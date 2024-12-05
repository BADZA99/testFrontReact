import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Outlet />
        <ToastContainer position="bottom-right" autoClose={2000} />
      </ThemeProvider>
    </>
  );
}

export default App;
