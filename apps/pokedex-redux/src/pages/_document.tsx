import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={`min-h-screen w-full overflow-x-hidden flex flex-col`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
