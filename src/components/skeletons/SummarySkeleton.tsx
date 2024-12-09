const SummarySkeleton = () => {
  return (
    <section className="animate-pulse">
      <h2 className="w-fit rounded-full bg-slate-400 text-2xl  font-semibold  leading-none text-transparent ">
        Summary
      </h2>
      <div className="h-8"></div>
      <table className="w-full ">
        <tbody>
          <tr>
            <td>
              <span className=" h-4 w-fit  rounded-full  bg-slate-400 leading-none text-transparent ">
                Subtotal
              </span>
            </td>
            <td className="py-1.5 text-right font-bold">
              <span className=" h-4 w-fit  rounded-full  bg-slate-400 leading-none text-transparent ">
                $533.25
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span className=" h-4 w-fit  rounded-full  bg-slate-400 leading-none text-transparent ">
                Estimated Shipping Cost
              </span>
            </td>
            <td className="py-1.5 text-right font-bold">
              {" "}
              <span className=" h-4 w-fit  rounded-full  bg-slate-400 leading-none text-transparent ">
                $533.25
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span className=" h-4 w-fit  rounded-full  bg-slate-400 leading-none text-transparent ">
                Estimated Tax
              </span>
            </td>
            <td className="py-1.5 text-right font-bold">
              {" "}
              <span className=" h-4 w-fit  rounded-full  bg-slate-400 leading-none text-transparent ">
                $533.25
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span className=" h-4 w-fit  rounded-full  bg-slate-400 leading-none text-transparent ">
                Total
              </span>
            </td>
            <td className="py-2 text-right font-bold">
              {" "}
              <span className=" h-4 w-fit  rounded-full  bg-slate-400 leading-none text-transparent ">
                $533.25
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="h-8 "></div>
      <div className="h-16 w-full  rounded-full  bg-slate-400 leading-none text-transparent" />
    </section>
  );
};

export default SummarySkeleton;
