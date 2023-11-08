import getUser from "@/helpers/getUser";

export default async function Home() {
  const user = await getUser();

  return <main>{/* <pre>{JSON.stringify(user, null, 3)}</pre> */}</main>;
}
