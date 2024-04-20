import type { ReactNode } from "react";
import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon Explorer",
  description: "Next.js monorepo Pokemon Explorer",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen w-full overflow-x-hidden flex flex-col`}>
        <header className="sticky flex items-center top-0 z-50 w-full p-4 h-14 bg-slate-500/30 backdrop-blur-lg border-b border-slate-300/30">
          <div className="uppercase text-white font-black text-xl">PokeDeX</div>
        </header>
        <main className="flex flex-col items-center w-full flex-1 justify-between">
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
