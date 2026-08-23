import { requireChatGPTUser } from "../chatgpt-auth";
import { MemberDashboard } from "./member-dashboard";

export const dynamic = "force-dynamic";

export default async function MemberPage() {
  const user = await requireChatGPTUser("/member");
  return <MemberDashboard displayName={user.displayName} />;
}
