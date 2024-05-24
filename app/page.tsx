import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/tournaments')

  return (
    <main className="w-[60%]">
      {/* <Navbar/> */}
      {/* <Sidebar/> */}
      Home Page
    </main>
    
  );
}
