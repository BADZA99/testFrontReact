import { ModeToggle } from "./mode-toggle"
import { MdShowChart } from "react-icons/md";



function Navbar() {
  return (
    <nav className=" inset-x-0 top-0 mx-auto  max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <a aria-current="page" className="flex items-center" href="/">
              <MdShowChart className="h-12 w-12 text-gray-900" />
            </a>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5 ">
            <a
              className="inline-block rounded-lg px-2 py-1 text-lg font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="/transactions"
            >
              Transactions
            </a>
            <a
              aria-current="page"
              className="inline-block rounded-lg px-2 py-1 text-lg font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="/charts"
            >
              Charts
            </a>
          </div>
          <div className="flex items-center justify-end gap-3">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar