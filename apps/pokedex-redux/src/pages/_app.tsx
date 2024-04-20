import App from "next/app";
import wrapper from "@/store";
import "@/styles/globals.css";
import "@repo/ui/styles.css"

class MyApp extends App {
  // @ts-expect-error
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- from library
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
      }
    }
  }
  render() {
    const { Component, pageProps } = this.props
    return <div className="min-h-screen w-full flex flex-col">
      <header className="sticky flex items-center top-0 z-50 w-full p-4 h-14 bg-slate-500/30 backdrop-blur-lg border-b border-slate-300/30">
        <div className="uppercase text-white font-black text-xl">PokeDeX</div>
      </header>
      <main className="flex flex-col items-center w-full flex-1 justify-between">
        <Component {...pageProps} />
      </main>
    </div>;
  }
}

export default wrapper.withRedux(MyApp)