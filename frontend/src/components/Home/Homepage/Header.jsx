import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-lg font-bold">Sehat.co</h1>
      <div className="flex items-center gap-4">
        <button className="text-sm font-medium text-gray-600">
          Find a Practitioner
        </button>
        <button className="text-sm font-medium text-gray-600">
          List your practise, it's free
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
