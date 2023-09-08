import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { db } from "@/settings/firebase.setting";
import { getDocs,collection,orderBy,query } from "firebase/firestore";

export async function getStaticProps() {
    const partners = [];

    const q = query(collection(db,'partners'),orderBy('createdAt','desc'))
    const onSnap = await getDocs(q);

    onSnap.docs.map(document => {
        partners.push({
            id:document.id,
            data:document.data(),
        })
    });

    return {
        props: {
            data:partners,
        }
    }
}

export default function Partners({data}) {
    console.log(data)

    return (
        <>
        <Head>
            <link rel="icon" href="/facepal_icon_logo.png" />
            <meta name="description" content="The Coolest way to connect with friends and hold money" />
            <meta name="keywords" content="facepal" />
            <title>facepal | Partners</title>
        </Head>
        <main className="px-4 py-6 sm:px-16 sm:py-16 md:px-24 md:py-20">
            <h1 className="text-4xl text-gray-700">
                Choose from our list of partners to access financial services
            </h1>

            <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
                {/* {
                    partners.map(item => (
                        <article>
                            {item.data.address}
                        </article>
                    ))
                } */}
            </section>
        </main>
        </>
    )
}