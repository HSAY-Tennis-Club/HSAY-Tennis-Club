import { MemberDashboard } from "./member-dashboard";
import { headers } from "next/headers";

export default async function MemberPage({ searchParams }: { searchParams?: Promise<{ surface?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const userAgent = (await headers()).get("user-agent") ?? "";
  const phoneDevice = /Android|iPhone|iPod|Windows Phone|Mobile/i.test(userAgent) && !/iPad/i.test(userAgent);
  const initialSurface = params.surface === "mini" || (!params.surface && phoneDevice) ? "mini" : "web";
  return <MemberDashboard displayName="HSAY 会员" initialSurface={initialSurface} />;
}
