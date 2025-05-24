"use client"
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {

  const [message, setMessage] = useState("walid");

  useEffect(()=>{
    fetch("http://localhost:5000/").then(
      response => response.json()
    ).then(
      data => {
        setMessage(data.message);
      }
    )
  }, [])

  return (
    <div className="p-4">
      <div>
      {message}
      <br />
      <br />
      </div>
      <div>
        <Link href="/login">
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
        </Link>
        <Link href="/arruy">
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Arruy</button>
        </Link>
        <Link href="/kocak">
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Kocak</button>
        </Link>
      </div>
    </div>

  );
}
