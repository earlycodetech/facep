import { useEffect,useContext} from 'react';
import { AppContext } from '@/settings/globals';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const {ip} = useContext(AppContext);
  console.log(ip);

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push('/account/make-transfer');
  //   },5000);
  // },[]);

  return (
    <>
      <div className="h-screen w-full flex flex-col justify-around bg">
        <Image src="/imgs/bg-mobile.jpg" width={60} height={60} className="h-screen w-full sm:hidden" alt="cover image"/>
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 px-8 sm:px-10 lg:px-24">
            <div className="w-full sm:min-h-[480px] bg-indigo-300/20 py-6 sm:py-10 px-[40px] rounded-lg">
                <h1 className="text-indigo-800 text-4xl sm:text-6xl font-mono font-bold">facepal</h1>
                <h2 className="text-2xl sm:text-3xl mt-4">The Coolest way to connect with friends and hold money</h2>
            </div>
            <div className="w-full sm:min-h-[480px] flex flex-col gap-5">
                <form className="flex flex-col gap-3">
                    <input 
                    type="email" 
                    placeholder="Email address"
                    className="py-3 sm:py-5 px-2 border border-indigo-400 rounded-lg bg-white/60"
                    />
                    <input 
                    type="password" 
                    placeholder="Password"
                    className="py-3 sm:py-5 px-2 border border-indigo-400 rounded-lg bg-white/60"
                    />
                    <button className="max-w-[160px] h-12 bg-indigo-800 rounded-lg text-white font-bold"
                    >Log in to facepal</button>
                </form>
        
                <div className="w-full grid grid-cols-2 gap-3">
                    <button 
                    className="w-full h-12 bg-green-600 rounded-lg text-white font-bold">Google</button>
                    <button className="w-full h-12 bg-sky-600 rounded-lg text-white font-bold">Twitter</button>
                </div>
        
                <p className="text-2xl text-white">New to facepal? <Link href="#" className="underline">create account</Link></p>
            </div>
        </div>
      </div>
    </>
  )
}
