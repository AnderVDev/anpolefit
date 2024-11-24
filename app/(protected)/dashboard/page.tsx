import { auth } from "@/auth";


export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="container">
      {/* <h1>{process.env.testKey}</h1> */}
      <pre>{JSON.stringify(session, null, 2)}</pre>


    </div>
  );
}
