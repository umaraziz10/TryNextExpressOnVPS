"use client"

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import Link from 'next/link';

interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    name: string;
    email: string;
  };
  message?: string;
}

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [token, setToken] = useState<string | null>(null);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
        const res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        const data: LoginResponse = await res.json();

        if (res.ok && data.success) {
            setMessage('Login sukses!\n Coba liat cookie kamu di dev mode, ada ga?');
            setToken(data.token || '');
            router.push("/kocak");
        } else {
            setMessage(data.message || 'Credential kocak');
        }
        } catch (err) {
        setMessage('Error saat login');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
        <h2>Halaman Login</h2>
        <form onSubmit={handleLogin}>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 10 }}
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 10 }}
            />
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>

            <Link href="/">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Balik</button>
            </Link>
        </form>
        <p>{message}</p>
        {token && (
            <div style={{ marginTop: 10 }}>
            <strong>Token:</strong> <code>{token}</code>
            </div>
        )}
        </div>
    );
}
