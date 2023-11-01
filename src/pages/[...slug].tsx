import ColorFilter from "~/components/Filters/ColorFilter";
import SizeFilter from "~/components/Filters/SizeFilter";

const ProductsPage = () => {
  return (
    <section className="flex items-center justify-between">
      <div className="h-screen w-64 border">
        <ColorFilter />
        <SizeFilter />
      </div>
    </section>
  );
};

export default ProductsPage;
