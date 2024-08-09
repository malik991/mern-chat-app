import React from "react";
import { Link } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io";
import { SiLinkedin } from "react-icons/si";
import { FaSquareTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className=" w-1/2 px-5 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <footer className="border-t-2 mt-8 py-3 ">
        <div
          className="flex md:flex-row flex-col md:justify-between
     justify-center items-center md:gap-y-0 gap-y-4"
        >
          <div>
            <span className="text-lg text-blue-500">
              Made with 💖 by{" "}
              <a
                href="https://alrehmanai.netlify.app/"
                target="_blank"
                className="hover:underline text-primary"
              >
                Al-Rehman
              </a>{" "}
              © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-x-3">
            <Link
              to={"https://www.linkedin.com/in/mubashar-hassan-sci/"}
              target="_blank"
            >
              <SiLinkedin className="w-5 h-5" />
            </Link>
            <Link to={"https://github.com/malik991"} target="_blank">
              {/* <Image src={github} alt="github" /> */}
              <IoLogoGithub className="w-6 h-6" />
            </Link>
            <Link to={"https://x.com/malik9914"} target="_blank">
              <FaSquareTwitter className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
