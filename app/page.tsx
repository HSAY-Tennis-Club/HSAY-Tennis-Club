import { getChatGPTUser } from "./chatgpt-auth";
import { HSAYClub } from "./hsay-club";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getChatGPTUser();

  return <HSAYClub isSignedIn={Boolean(user)} displayName={user?.displayName} />;
}
