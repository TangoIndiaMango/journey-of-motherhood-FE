import Link from "next/link";
import React from "react";
import { BsFacebook, BsInstagram, BsTelegram, BsTwitter } from "react-icons/bs";
const data = [
  { title: "Company", links: ["About us", "News", "Media kit", "Contact"] },
  {
    title: "Resources",
    links: ["Blog", "Newsletter", "Help Center", "Support"],
  },
  {
    title: "Quick Links",
    links: ["Overview", "Sitemap", "Gift cards", "Orders"],
  },
  { title: "Social", links: ["Twitter", "Instagram", "Facebook", "Linkedin"] },
  { title: "Legal", links: ["Terms", "Privacy", "Cookies", "Licences"] },
];

const Footer = () => {
  return (
    <footer className="p-10 bg-black text-white w-full">
      <div className="flex items-start justify-between flex-col md:flex-row">
        <div className="">
          <h4 className="text-[16px] font-bold">Stay in the loop</h4>
          <p className="text-[12px] font-light text-white  md:w-[100%] mb-3">
            Be the first to know about upcoming events
          </p>
        </div>
        <form className="flex gap-4">
          <input
            type="text"
            className="bg-gray-800 px-2 w-fit text-white text-xs"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="text-xs bg-[var(--primaryColor)] px-4 rounded-none min-w-[150px]"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="my-10 flex flex-wrap gap-12 md:justify-between">
        {data.map((d, i) => (
          <div className="flex flex-col gap-2 my-4" key={`${d} + ${i}`}>
            <h6 className="text-[12px] text-gray-300">{d.title}</h6>
            {d.links.map((link) => (
              <Link
                key={link}
                href={"#"}
                className="text-[12px] transition ease-in-out hover:text-gray-300"
              >
                {link}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="bg-gray-700 w-full h-[1px]" />
      <div className="flex justify-between items-center mt-8">
        <div className="">LOGO</div>
        <div className="flex items-center gap-4">
          <BsFacebook />
          <BsTelegram />
          <BsInstagram />
          <BsTwitter />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
