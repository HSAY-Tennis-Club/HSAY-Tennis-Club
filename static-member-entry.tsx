import { createRoot } from "react-dom/client";
import { MemberDashboard } from "./app/member/member-dashboard";
import "./app/globals.css";
createRoot(document.getElementById("root")!).render(<MemberDashboard displayName="HSAY 会员" initialSurface="web" />);
