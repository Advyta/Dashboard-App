"use client";

import SessionInitializer from "../components/SessionInitializer";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SessionInitializer />
      {children}
    </div>
  );
}
