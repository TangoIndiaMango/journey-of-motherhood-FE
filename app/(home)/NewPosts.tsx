const NewPosts = () => {
  return (
    <>
      <div className="flex gap-3 items-center my-4 ">
        <div className="flex gap-2 text-[12px] font-bold items-start">
          <div className="w-[15%]">
            <div className="w-5 h-5 rounded-full bg-gray-500" />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h4 className="text-[12px] font-bold">M. Bakare</h4>
            <h6 className="text-[10px] text-gray-600">11.5k</h6>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-[10%]"></div>
        <p className="text-xs">Lorem, ipsum dolor...</p>
      </div>
    </>
  );
};

export default NewPosts;
