import ColorFilter from "~/components/Filters/ColorFilter";
import SizeFilter from "~/components/Filters/SizeFilter";
import Products from "~/components/Products";

const ProductsPage = () => {
  return (
    <main className="flex items-center justify-between">
      <section className="h-screen w-64 border">
        <SizeFilter />
        <ColorFilter />
      </section>
      <section>
        <Products />
      </section>
    </main>
  );
};

export default ProductsPage;
