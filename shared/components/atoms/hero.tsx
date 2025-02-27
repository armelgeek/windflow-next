const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border h-96 pt-5 border-gray-400 ">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          <div className="flex items-center gap-2 ">
            <p className="font-medium text-sm md:text-base uppercase">Call action text</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed ">
            {' '}
            <span className="text-[#414141]">Call to action</span>{' '}
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base uppercase">Call action action</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2"></div>
    </div>
  );
};

export default Hero;
