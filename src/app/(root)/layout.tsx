import React from "react";
import Header from "@/components/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen text-gray-400">
      <Header />
      <div className="conatainer py-10 px-4">{children}</div>
    </main>
  );
};

export default layout;
