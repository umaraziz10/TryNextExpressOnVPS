"use client"

import { get } from "http"
import { useRouter } from "next/navigation"
import React, {use, useEffect, useState} from "react"

export default function Index(){
    const router = useRouter();
    const [message, setMessage] = useState("sabar ya dek")
    const [handler, setHandler] = useState("")
    const [btnMsg, setBtnMsg] = useState("")


    const handleLogout = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/logout`, {
            method: 'POST',
            credentials: 'include'
          });
    
          const data = await res.json();
    
          if (data.success) {
            router.push('/');
          } else {
            alert("Logout gagal!");
          }
        } catch (err) {
          alert("Ada error saat logout!");
        }
    };

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/kocak`, {
            method: "GET",
            credentials: "include"
        }).then(
            response => response.json(),
        ).then(
            data => {
                setMessage(data.message)
                if(!data.success){
                    setHandler("nanti kita ketemu lagi")
                    setBtnMsg("Balik")
                } else {
                    setHandler("awkokwaow mampus kena tipu")
                    setBtnMsg("Logout")
                }
            }
        )
    },[])

    return(
        <section className="mx-auto px-4">
            <p>
                {message}
                <br />
                {handler}
                <br />
                <br />
            </p>
            <button onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{btnMsg}</button>
        </section>

    )
}