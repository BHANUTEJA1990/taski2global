// app/home/page.tsx
"use client"; // only if you need client-side hooks

import { useState } from "react";

export default function HomePage() {
    const [count, setCount] = useState(0);

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Home Page</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </main>
    );
}
