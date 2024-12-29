import { useCartContext } from "~/context/cartContext";
import { formatCurrency } from "~/utilities/formatCurrency";

export const Summary = ({ isLoading }: { isLoading: boolean }) => {
  const { costs } = useCartContext();

  return (
    <section className={isLoading ? "animate-pulse" : ""}>
      <h2 className="text-2xl font-semibold leading-none">Summary</h2>
      <div className="h-8"></div>
      <table className="w-full ">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td className="py-1.5 text-right font-bold">
              {formatCurrency(costs.subtotal ?? 0)}
            </td>
          </tr>
          <tr>
            <td>Estimated Shipping Cost</td>
            <td className="py-1.5 text-right font-bold">
              {formatCurrency(costs.shippingCost)}
            </td>
          </tr>
          <tr>
            <td>Estimated Tax</td>
            <td className="py-1.5 text-right font-bold">
              {formatCurrency(costs.taxes ?? 0)}
            </td>
          </tr>
          <tr className="border-t border-slate-300 ">
            <td>Total</td>
            <td className="py-2 text-right font-bold">
              {formatCurrency(costs.totalCost ?? 0)}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="h-8"></div>
    </section>
  );
};

export default Summary;
