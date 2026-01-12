import Home from "./pages/Home";
import Usage from "./pages/Usage";
import Tasks from "./pages/Tasks";
import Reference from "./pages/Reference";
import About from "./pages/About";
import Usage_pending from "./pages/Usage_pending";

const router = [
    {"path": "", "component": <Home/>},
    {"path": "home", "component": <Home/>},
    //{"path": "usage", "component": <Usage/>},
    {"path": "tasks", "component": <Tasks/>},
    {"path": "reference", "component": <Reference/>},
    {"path": "about", "component": <About/>},
    {"path":"usage","component":<Usage_pending/>}
 
]

export default router;