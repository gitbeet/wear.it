const CartItemDetail = ({
  children,
  text,
}: {
  children?: JSX.Element;
  text: string;
}) => (
  <div className="flex gap-2">
    <span className="text-slate-600">{text}: </span>
    {children}
  </div>
);
export default CartItemDetail;
