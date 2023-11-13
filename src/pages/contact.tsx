import ProductCardCarousel from "~/components/ProductCardCarousel";
import { api } from "~/utils/api";

const Contact = () => {
  const { data, isLoading } = api.product.getAll.useQuery({});
  return (
    <ProductCardCarousel products={data?.products} isLoading={isLoading} />
  );
};

export default Contact;
