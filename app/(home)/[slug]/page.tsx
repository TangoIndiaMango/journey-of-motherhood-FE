import { BsArrowUp, BsPlus } from "react-icons/bs";
import TopUsers from "./TopUsers";
import Link from "next/link";
import SlugContent from "./SlugContent";
const data = [
  "Help",
  "About",
  "Blog",
  "Topics",
  "Top topics",
  "Terms",
  "Advertise",
  "Press",
  "Privacy policy",
];

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <section className="m-10 md:grid grid-cols-3 gap-4 md:mx-0 md:px-5 ">
      <div className="md:col-span-2">
        <SlugContent />
        <SlugContent />
        <SlugContent />
        <SlugContent />
        <SlugContent />
        <SlugContent />
        <SlugContent />
      </div>
      <div className="col-span-1 md:grid gap-4 h-fit hidden ">
        <button className="flex items-center gap-2 justify-center  px-4">
          <BsPlus className="text-white text-xl" />
          <span className="text-xs">Start a discussion</span>
        </button>

        <div className="card">
          <h4 className="font-bold text-sm mb-5">Top Users</h4>
          <div className="pb-4">
            <TopUsers />
            <TopUsers />
            <TopUsers />
            <TopUsers />
            <TopUsers />
            <TopUsers />
          </div>
          <div className="border-t-[1px] border-gray-400">
            <TopUsers name="You" />
          </div>
        </div>
        <div className="card grid grid-cols-2 gap-4 ">
          {data.map((d, i) => (
            <Link
              href={d}
              key={d}
              className={`text-[10px] text-gray-500 ${
                i % 2 == 1 && "justify-self-end"
              }`}
            >
              {d}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
