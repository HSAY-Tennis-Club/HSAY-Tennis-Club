import { createRoot } from "react-dom/client";
import { MemberDashboard } from "./app/member/member-dashboard";
import "./app/globals.css";

const initialSurface = new URLSearchParams(window.location.search).get("surface") === "mini" ? "mini" : "web";
const initialPlayerId = new URLSearchParams(window.location.search).get("player") ?? "peter";

createRoot(document.getElementById("root")!).render(
  <MemberDashboard displayName="HSAY 会员" initialSurface={initialSurface} initialPlayerId={initialPlayerId} />,
);
