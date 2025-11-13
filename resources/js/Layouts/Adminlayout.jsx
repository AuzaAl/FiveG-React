import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { ArrowDownNarrowWide, BarChart2, Book, LayoutDashboard, Menu, Package, PackageMinus, Search, UserPen, Users, X } from 'lucide-react';
import React, { useState } from 'react'

export default function Adminlayout({children}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = usePage().props.auth.user;

  const sidebarItems = [
    { name: 'Dashboard', icon:LayoutDashboard, linkto: 'dashboard' },
    { section: 'Data Section' },
    { name: 'Students', icon: Book, linkto: 'dashboard.students.index' },
    { name: 'Teachers', icon: UserPen, linkto: 'dashboard.teachers.index' },
    { name: 'Inventory', icon: Package, linkto: 'dashboard.inventories.index' },
    { name: 'Category', icon: ArrowDownNarrowWide, linkto: 'dashboard.categories.index' },

  ];

  

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans antialiased">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar / Navbar */}
      <aside className={`
         inset-y-0 border-r border-border-color left-0 w-64 bg-darkui transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
           fixed z-50 md:translate-x-0 md:fixed md:z-auto overflow-y-auto
      `}>
        <div className="p-4 flex items-center justify-center">
          <Link href="/">
            <ApplicationLogo className="block h-9 w-auto" />
          </Link>
          <button className="md:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="px-4 py-5">
          {sidebarItems.map((item, index) => (
            item.section ? (
              <h3 key={index} className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wide text-text-color-light">
                {item.section}
              </h3>
            ) : (
              <Link
                href={route(item.linkto)}
                key={index}

                className={`flex items-center px-4 py-2.5 text-md rounded-lg ${item.active
                  ? 'bg-orange-500/10 text-orange-500 rounded-md'
                  : 'hover:bg-white text-gray-200 hover:text-black'
                  } transition-colors`}
              >
                <item.icon size={22} className="mr-3 stroke-2" />
                {item.name}
                {item.active && <ChevronDown size={16} className="ml-auto" />}
              </Link>

            )
          ))}
        </nav>
      </aside>

      {/* Main Container */}
      <div className="md:ml-64">
        {/* Header */}
        <header className="bg-darkui sticky z-99 top-0 px-6 py-4 flex items-center justify-between border-b border-border-color">
          <div className="flex items-center space-x-4">
            <button className="md:hidden text-gray-400" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="relative text-text-color-light">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-color-light" />
              <input
                type="text"
                placeholder="Search"
                className="bg-[#202020] text-sm pl-10 pr-4 py-2 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 w-48 md:w-64"
              />
            </div>
          </div>
          <div className="hidden sm:ms-6 sm:flex sm:items-center">
            <div className="relative ms-3">
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md transparent px-1 py-2 text-sm font-medium leading-4 text-white transition duration-150 ease-in-out hover:text-gray-200 focus:outline-none"
                    >
                      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8" 
                      style={{ backgroundImage: `url(https://c.tenor.com/rUOKT9eCe2kAAAAd/tenor.gif)` }}
                      />

                      <svg
                        className="-me-0.5 ms-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                </Dropdown.Trigger>

                <Dropdown.Content>
                  <Dropdown.Link
                    href={route('profile.edit')}
                  >
                    Profile
                  </Dropdown.Link>
                  <Dropdown.Link
                    href={route('logout')}
                    method="post"
                    as="button"
                  >
                    Log Out
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>
        </header>

        <main className="p-6 space-y-8 min-h-screen overflow-x-hidden font-GenSan">
          {/* Dashboard Section */}
          {children}
        </main>
        <div id="footer" className='w-full flex justify-between py-2 px-5 font-GenSan text-sm border-t'>
          <p>Made by Auza with love</p>
          <p>Copyright@2025</p>
        </div>
      </div>
    </div>
  );
};