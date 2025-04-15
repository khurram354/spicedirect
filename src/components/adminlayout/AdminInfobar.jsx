'use client';
import { InfoBar } from "./NavBarItems";
const AdminInfobar = () => {
  return (
    <>
      <div className="grid grid-cols-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-4 gap-4 sm:w-3/4 relative top-2 z-10 left-72">
        {InfoBar && InfoBar.map((ele, index) => (
          <div className="bg-primary  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-secondary text-white font-medium group" key={index}>
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">{ele.icon}</div>
            <div className="text-right">
              <p className="text-2xl"></p>
              <p>{ele.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdminInfobar