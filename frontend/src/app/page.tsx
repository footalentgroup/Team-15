import Link from "next/link";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={`flex flex-col items-center justify-center h-screen ${inter.className}`}>
      <h2>Bienvenidos</h2>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      <Link href="/home">Home</Link>
      <Link href="/add-course">Add course</Link>
    </div>
  );
}


