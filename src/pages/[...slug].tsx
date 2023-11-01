import ColorFilter from "~/components/Filters/ColorFilter";
import SizeFilter from "~/components/Filters/SizeFilter";
import Products from "~/components/Products";

const ProductsPage = () => {
  return (
    <main className="flex gap-4 pt-12">
      <section className="h-screen w-[450px] border">
        <SizeFilter />
        <ColorFilter />
      </section>
      <Products />
    </main>
  );
};

export default ProductsPage;
