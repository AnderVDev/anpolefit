import { auth } from "@/auth";


export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="container">
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
