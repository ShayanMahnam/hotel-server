import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="font-medium flex justify-center w-full dark:text-white">
      <h4>
        created by{" "}
        <a
          className="hover:underline"
          href="https://shayanmahnam.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          Shayan
        </a>
      </h4>
    </footer>
  );
};

export default Footer;
