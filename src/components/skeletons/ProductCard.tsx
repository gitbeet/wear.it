const SkeletonCard = ({ slider = false }: { slider?: boolean }) => {
  return (
    <div
      className={`${
        slider ? "relative min-h-[500px] min-w-[400px] snap-start" : ""
      }  animate-pulse bg-slate-50 pb-2  text-slate-800`}
    >
      <div>
        <div className="relative">
          <div className="absolute bottom-4 right-4 z-10  h-10 w-10   rounded-full bg-slate-300"></div>
          <div className="relative aspect-square w-full bg-slate-200" />
          <p className="absolute bottom-2 left-4 h-4 w-16 rounded-full bg-slate-300"></p>
        </div>
      </div>
      <div className="h-4"></div>
      <div className="min-h-[4rem] overflow-hidden pl-4">
        <p className="h-4 w-3/4 rounded-full bg-slate-300"></p>
        <div className="h-1"></div>
        <p className="h-4 w-16 rounded-full bg-slate-300"></p>
      </div>
    </div>
  );
};

export default SkeletonCard;
