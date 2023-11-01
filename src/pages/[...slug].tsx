import ColorFilter from "~/components/Filters/ColorFilter";

const ProductsPage = () => {
  return (
    <section className="flex items-center justify-between">
      <div className="h-screen w-64 border">
        <ColorFilter />
      </div>
    </section>
  );
};

export default ProductsPage;
