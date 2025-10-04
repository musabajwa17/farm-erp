// components/GuestRoute.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GuestRoute({ children, redirectTo = "/fields" }) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token) {
      router.replace(redirectTo); 
    } else {
      setAuthChecked(true); 
    }
  }, [router, redirectTo]);

  if (!authChecked) return null; 

  return <>{children}</>;
}
