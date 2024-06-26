import NavbarComponent from "@repo/ui/components/common/layout/navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import ThemeSwitchComponent from "../common/theme-switch";

export default function RootLayoutComponent({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <NavbarComponent
        logo={
          <Link href="/">
            <Image
              alt="logo"
              className="h-8"
              height={30}
              src="/logo.svg"
              width={150}
            />
          </Link>
        }
        navigate={(path) => {
          router.push(path);
        }}
      >
        <ThemeSwitchComponent />
      </NavbarComponent>
      <main className="w-full flex-1 relative overflow-auto">
        <Image
          alt="pokemon"
          className="absolute object-cover top-0 left-0 w-full h-full z-0 opacity-10"
          height="1080"
          src="https://images.unsplash.com/photo-1627693685101-687bf0eb1222?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width="1920"
        />
        <div className="container h-full overflow-auto mx-auto relative">
          {children}
        </div>
      </main>
    </>
  );
}
