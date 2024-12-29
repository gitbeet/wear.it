const ProductCardText = ({
  name,
  category,
}: {
  name: string;
  category: string;
}) => {
  return (
    <>
      <p className="line-clamp-1 font-semibold">{name}</p>
      <div className="h-1"></div>
      <p className="text-slate-500">{category}</p>
    </>
  );
};

export default ProductCardText;
