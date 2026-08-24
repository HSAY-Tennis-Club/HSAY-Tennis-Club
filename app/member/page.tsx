import { MemberDashboard } from "./member-dashboard";

export default async function MemberPage({ searchParams }: { searchParams?: Promise<{ surface?: string }> }) {
  const params = searchParams ? await searchParams : {};
  return <MemberDashboard displayName="HSAY 会员" initialSurface={params.surface === "mini" ? "mini" : "web"} />;
}
