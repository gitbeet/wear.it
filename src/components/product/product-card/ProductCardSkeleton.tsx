const ProductCardSkeleton = () => {
  return (
    <div className=" flex animate-pulse flex-col items-center justify-center p-1">
      <div className="aspect-square w-full">
        <div className="relative">
          <div className="absolute right-4 top-4 z-10  h-10 w-10   rounded-full bg-slate-300"></div>
          <div className="relative aspect-square w-full bg-slate-200" />
          <p className="absolute bottom-2 left-4 h-8 w-20 rounded-sm bg-slate-300"></p>
        </div>
      </div>
      <div className="h-4"></div>
      <div className="min-h-[4rem] w-full self-start overflow-hidden pl-4">
        <p className="h-3.5 w-3/4 rounded-full bg-slate-300"></p>
        <div className="h-1.5"></div>
        <p className="h-3.5 w-16 rounded-full bg-slate-300"></p>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
