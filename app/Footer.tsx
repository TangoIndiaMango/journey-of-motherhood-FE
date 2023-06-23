import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
const data = [
  // { title: "Company", links: ["About us", "News", "Media kit", "Contact"] },
  // {
  //   title: "Resources",
  //   links: ["Blog", "Newsletter", "Help Center", "Support"],
  // },
  // {
  //   title: "Quick Links",
  //   links: ["Overview", "Sitemap", "Gift cards", "Orders"],
  // },
  {
    title: "Social",
    links: [
      {
        name: "Twitter",
        href: "https://twitter.com/JourneyOfM17447?s=20",
      },
      {
        name: "Instagram",
        href: "https://instagram.com/journeyofmotherhood2?igshid=NTc4MTIwNjQ2YQ==",
      },
      {
        name: "Facebook",
        href: "https://www.facebook.com/profile.php?id=100092326195038",
      },
    ],
  },
  // { title: "Legal", links: ["Terms", "Privacy", "Cookies", "Licences"] },
];

const Footer = () => {
  return (
    <footer className="p-10 bg-black text-white w-full relative mt-5">
      <div className="max-w-[1440px] mx-auto ">
        {/* <div className="flex items-start justify-between flex-col md:flex-row">
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
        </div> */}

        <div className="my-10 flex justify-between">
          {data.map((d, i) => (
            <div className="flex flex-col gap-2 my-4" key={`${d} + ${i}`}>
              <h6 className="text-[12px] text-gray-300">{d.title}</h6>
              {d.links.map((link) => (
                <a
                  key={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link.href}
                  className="text-[12px] transition ease-in-out hover:text-gray-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="bg-gray-700 w-full h-[1px]" />
        <div className="flex justify-between items-center mt-2">
          <Link href={"/"} className="">
            <Image
              src={"/bg-logo.png"}
              alt="logo"
              width={200}
              height={200}
              className="w-[100px] relative -left-10"
            />
          </Link>
          <div className="flex items-center gap-4">
            <a
              href={"https://www.facebook.com/profile.php?id=100092326195038"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsFacebook />
            </a>

            <a
              href={"mailto:journeyofmotherhood2@gmail.com"}
              // target="_blank"
              // rel="noopener noreferrer"
            >
              <FiMail />
            </a>
            <a
              href={
                "https://instagram.com/journeyofmotherhood2?igshid=NTc4MTIwNjQ2YQ=="
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram />
            </a>
            <a
              href={"https://twitter.com/JourneyOfM17447?s=20"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
