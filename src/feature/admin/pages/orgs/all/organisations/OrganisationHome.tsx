import React from "react";

const OrganisationHome: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#4b1b7a] to-[#2d2a8c] text-white">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome</h1>
        <p className="text-lg md:text-xl text-white/80">
          Admin Dashboard
        </p>
      </div>
    </div>
  );
};

export default OrganisationHome;
