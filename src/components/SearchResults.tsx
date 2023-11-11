import Image from "next/image";
import { type RouterOutputs } from "~/utils/api";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  results: RouterOutputs["product"]["searchProduct"];
}

const SearchResults = ({ show, setShow, results }: Props) => {
  return (
    show &&
    results && (
      <div className="absolute z-50 h-[400px] w-full bg-gray-50">
        {results.length < 1 && <h1>No results found</h1>}
        {results.length > 0 &&
          results.map((res) => (
            <div key={res.id}>
              <p>{res.name}</p>
              <Image
                width={150}
                height={150}
                src={res.images[0]?.imageURL ?? ""}
                alt="prod image"
              />
              <p>{res.price}</p>
            </div>
          ))}
      </div>
    )
  );
};

export default SearchResults;
