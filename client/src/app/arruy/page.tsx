"use client"

import React, { useEffect, useState} from "react"
import Link from "next/link"

export default function Index(){

    const[ arruy, setArruy ] = useState(["sabar ya dik"]);

    useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/arruy`, {
            method: "GET",
            credentials: "include"
        }).then(
            response => response.json()
        ).then(
            data => {
                setArruy(data.arruy)
            }
        )
    }, [])

    return(
        <div className="mx-auto px-4">
            <h1>
                KATA KATA HARI INI DARI API:
            </h1>
            <br />

            {arruy.map((item, index) => (
                <div key={index}>
                    <p>
                        {item}
                    </p>
                </div>
            ))}
            <br />
            <Link href="/">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Balik</button>
            </Link>
        </div>
    )
}