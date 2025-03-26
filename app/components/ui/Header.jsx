import React from 'react'

const Header = () => {
  return (
    <div className="">
      <nav className="flex w-full items-center justify-between border-t border-b border-black px-4 py-4 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <img src="https://img1.wsimg.com/isteam/ip/67f024bd-8725-4051-8f8c-647aad4b7d78/IMG_0053.png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200/qt=q:95" className="h-10"/>
          <h1 className="text-base font-bold md:text-2xl text-white">ARt Emerged</h1>
        </div>
        <button className="w-24 transform rounded-lg bg-black px-6 py-2 border-2 border-white font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Login
        </button>
      </nav>
    </div>
  )
}

export default Header