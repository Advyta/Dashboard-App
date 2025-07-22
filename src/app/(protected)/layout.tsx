"use client";

import Navigation from "@/ui/navigation";
import SessionInitializer from "../components/SessionInitializer";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(315deg,_#000328_0%,_#00458E_100%)]">
      <SessionInitializer />
      <div className="flex ">
        <section className="">
          <Navigation />
        </section>
        {children}
      </div>
    </div>
  );
}
