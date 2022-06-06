import React from "react";
import Router from "./components/Router";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="container mx-auto">
      <Header />
      <main className="mt-20 w-6/12 mx-auto">
        <Router />
      </main>
    </div>
  );
}
