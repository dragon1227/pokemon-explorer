import wrapper from "@/store";
import "@/styles/globals.css";
import "@repo/ui/styles.css"
import type { AppProps } from "next/app";
import App from "next/app";

class MyApp extends App {
  // @ts-ignore
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
      }
    }
  }
  render() {
    const { Component, pageProps } = this.props
    return <div className="min-h-screen w-full flex flex-col">
      <header className="sticky flex items-center top-0 z-50 w-full p-4 h-14 bg-slate-500/30 backdrop-blur-lg border-b border-slate-300/30">
        <div className="uppercase text-white font-black text-xl">PokeDek</div>
      </header>
      <main className="flex flex-col items-center w-full flex-1 justify-between">
        <Component {...pageProps} />
      </main>
    </div>;
  }
}

export default wrapper.withRedux(MyApp)