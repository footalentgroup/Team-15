import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>Bienvenidos</h2>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      <Link href="/home">Home</Link>
    </div>
  );
}
