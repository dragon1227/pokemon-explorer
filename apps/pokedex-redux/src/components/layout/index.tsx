import NavbarComponent from "@repo/ui/components/common/layout/navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import ThemeSwitchComponent from "../common/theme-switch";

export default function RootLayoutComponent({ children }: { children: ReactNode }) {
  const router = useRouter()
  return (<div className="min-h-screen w-full flex flex-col">
    <NavbarComponent logo={
      <Link href="/">
        <Image alt="logo" className="h-8" height={30} src="/logo.svg" width={150} />
      </Link>
    } navigate={(path) => { router.push(path) }}>
      <ThemeSwitchComponent />
    </NavbarComponent>
    <main className="flex flex-col items-center w-full flex-1 justify-between">
      {children}
    </main>
  </div>)
}