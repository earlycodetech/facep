import Link from "next/link";
import { TextField,Button } from "@mui/material";
import { PastTransaction } from "../../components/PastTransaction";

export default function MakeTransfer() {
    return (
        <main className="px-6 sm:px-10 md:px-20">
            <Link 
            href="/feeds"
            className="text-indigo-800 text-4xl sm:text-6xl font-mono font-bold">
                facepal
            </Link>

            <section className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6 mt-6">
                <article className="bg-rose-100 p-4 rounded-xl">
                    <h3 className="text-3xl">Make Transfer</h3>

                    <form className="w-full flex flex-col gap-3 mt-4">
                        <TextField 
                        id="outlined-basic" 
                        label="account email" 
                        variant="outlined" 
                        color="secondary"
                        />  
                        <p>Jack Baur</p>

                        <TextField 
                        id="outlined-basic" 
                        label="amount" 
                        variant="outlined" 
                        color="secondary"
                        />  

                        <Button 
                        variant="contained"
                        color="secondary"
                        >Transfer</Button>
                    </form>                    
                </article>

                <aside className="border border-gray-200 p-4 rounded-xl">
                    <h3 className="text-3xl text-gray-700">Recent transfers</h3>
                
                    <ul className="h-[400px] flex flex-col gap-3 overflow-y-scroll">
                        <PastTransaction
                        recipient="Mary Adewale"
                        email="mary@interswitch.com"
                        amount={46000}
                        time="13 hours"/>

                        <PastTransaction
                        recipient="Ade Adetunde"
                        email="adetunde@gmail.com"
                        amount={46000}
                        time="13 hours"/>

                        <PastTransaction
                        recipient="Mary Adewale"
                        email="mary@interswitch.com"
                        amount={46000}
                        time="13 hours"/>

                        <PastTransaction
                        recipient="Mary Adewale"
                        email="mary@interswitch.com"
                        amount={46000}
                        time="13 hours"/>
                        <PastTransaction
                        recipient="Mary Adewale"
                        email="mary@interswitch.com"
                        amount={46000}
                        time="13 hours"/>
                        <PastTransaction
                        recipient="Mary Adewale"
                        email="mary@interswitch.com"
                        amount={46000}
                        time="13 hours"/>
                        <PastTransaction
                        recipient="Mary Adewale"
                        email="mary@interswitch.com"
                        amount={46000}
                        time="13 hours"/>
                        
                        <PastTransaction
                        recipient="Mary Adewale"
                        email="mary@interswitch.com"
                        amount={46000}
                        time="13 hours"/>

                        <PastTransaction
                        recipient="Mary Adewale"
                        email="mary@interswitch.com"
                        amount={46000}
                        time="13 hours"/>

                        <Link href="/account/transfer-history">
                            All transfer history</Link>
                    </ul>
                </aside>
            </section>
        </main>
    )
}