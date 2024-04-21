import type { ReactNode } from "react";

export interface INavbarItem {
  title: string;
  href?: string;
  component: ReactNode
}

export interface INavbar {
  // eslint-disable-next-line no-unused-vars -- no need for definition
  navigate?: (path: string) => void;
  items?: INavbarItem[];
  logo?: ReactNode;
  title?: string;
  children?: ReactNode;
}

export default function NavbarComponent(props: INavbar): JSX.Element {
  const { navigate, items, logo, title, children } = props
  const handleNavigate = (path?: string): void => {
    if (navigate) navigate(path ?? "#")
    else window.location.hash = path ?? "#";
  }
  const links = items?.map((item) => (
    <li key={item.href}
    >
      <button
        className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600"
        onClick={() => {
          handleNavigate(item.href)
        }}
        type="button"
      >
        {item.component}
        {item.title}
      </button>
    </li>
  ))
  return (
    <nav className="bg-gray-50 border-b border-slate-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {logo}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{title}</span>
        </div>
        {links ? <button aria-controls="navbar-hamburger" aria-expanded="false" className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" data-collapse-toggle="navbar-hamburger" type="button">
          <span className="sr-only">Open main menu</span>
          <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1h15M1 7h15M1 13h15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button> : null}
        {children}
        <div className="hidden w-full" id="navbar-hamburger">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            {links}
          </ul>
        </div>
      </div>
    </nav>
  )
}