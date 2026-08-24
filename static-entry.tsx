import { createRoot } from "react-dom/client";
import { HSAYClub } from "./app/hsay-club";
import "./app/globals.css";

createRoot(document.getElementById("root")!).render(<HSAYClub initialSurface="web" />);
