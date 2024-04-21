import type { ReactNode } from "react";
import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootLayoutComponent from "@/components/layout";
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
      <body
        className={`${inter.className} min-h-screen w-full overflow-x-hidden flex flex-col`}
      >
        <Providers>
          <RootLayoutComponent>
            {children}
          </RootLayoutComponent>
        </Providers>
      </body>
    </html>
  );
}
