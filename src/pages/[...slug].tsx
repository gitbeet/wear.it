import ColorFilter from "~/components/Filters/ColorFilter";
import SizeFilter from "~/components/Filters/SizeFilter";
import Products from "~/components/Products";

const ProductsPage = () => {
  return (
    <main className="relative grid grid-cols-[250px,1fr] gap-4 pt-12">
      <section className="h-screen  border">
        <SizeFilter />
        <ColorFilter />
      </section>
      <Products />
    </main>
  );
};

export default ProductsPage;
