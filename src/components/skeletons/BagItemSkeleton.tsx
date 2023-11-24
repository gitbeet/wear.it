import React from "react";

const BagItemSkeleton = ({ modal = false }: { modal?: boolean }) => {
  return (
    <div
      className={`${
        !modal ? " border-b border-slate-300" : ""
      } flex w-full animate-pulse gap-4 py-6`}
    >
      <div
        className={`${
          modal ? "h-[128px] w-[128px]" : "h-[196px] w-[196px]"
        } shrink-0 bg-slate-300`}
      />
      <div className="flex w-full flex-col justify-between">
        {/* TOP */}
        <div>
          <div className="flex justify-between gap-4">
            <div>
              <p
                className={`${
                  modal ? "max-w-[320px]" : ""
                } line-clamp-1 h-4 rounded-full bg-slate-400 text-transparent`}
              >
                Cozy Patterned Woolen Winter Hat
              </p>
              <div className="h-1.5"></div>
              <p className="h-4 w-fit rounded-full bg-slate-400 text-transparent">
                Hats & Beanies
              </p>
            </div>
            {!modal && (
              <p className="h-5 w-fit rounded-full bg-slate-400  text-transparent">
                $59.25
              </p>
            )}
          </div>
          <div className="h-3"></div>
          <div className="h-4 w-fit rounded-full bg-slate-400  text-transparent">
            Color: <span className="text-transparent">RED</span>
          </div>
        </div>
        {/* BOTTOM */}
        <div>
          {/* SIZE & QTY */}
          {modal && (
            <div className="flex gap-2 text-slate-600">
              <p className="h-4 w-fit rounded-full bg-slate-400  text-transparent">
                Size
              </p>
              <span className="h-4 w-fit rounded-full bg-slate-400  text-transparent">
                M
              </span>
            </div>
          )}
          {modal && (
            <p>
              <span className="h-4 w-fit rounded-full bg-slate-400  text-transparent">
                $59.25
              </span>{" "}
              <span className="h-4 w-fit rounded-full bg-slate-400 pl-2  text-transparent">
                $59.25
              </span>
            </p>
          )}

          {!modal && (
            <>
              <div className="flex gap-12">
                <div className="flex items-center gap-2 text-slate-600">
                  <p className="h-5 w-fit rounded-full bg-slate-400  text-transparent">
                    Sizes
                  </p>
                  <div className="h-5 w-8  rounded-full bg-slate-400  text-transparent"></div>
                </div>
                <div className="flex gap-2 text-slate-600">
                  <p className="h-5 w-fit rounded-full bg-slate-400  text-transparent">
                    Quantity
                  </p>
                  <div className="h-5 w-8 rounded-full bg-slate-400 pl-4  text-transparent"></div>
                </div>
              </div>
              <div className="h-4"></div>
            </>
          )}
          {/* BTNS */}
          {!modal && (
            <div className="flex gap-8">
              <div className="flex h-5 w-fit items-center rounded-full bg-slate-400  text-transparent">
                <div className="h-5 w-5" />
                <span>Add to Wishlist</span>
              </div>
              <div className="flex h-5 w-fit items-center rounded-full bg-slate-400  text-transparent">
                <div className="h-5 w-5" />
                <span>Add to Wishlist</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BagItemSkeleton;
