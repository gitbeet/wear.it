import React, { useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { api } from "~/utils/api";

type StarType = "EMPTY" | "HALF" | "FULL";

const Star = ({
  index,
  isHoverable,
  onHover,
  hoverRating,
  isHovered,
  rating,
  onClick,
}: {
  index: number;
  isHoverable: boolean;
  isHovered: boolean;
  hoverRating: number;
  onClick: () => void;
  onHover: () => void;
  rating: number | null;
}) => {
  const starSize = "h-5 w-5";
  const type: StarType =
    isHovered && isHoverable
      ? hoverRating > index - 1
        ? "FULL"
        : "EMPTY"
      : !rating
      ? "EMPTY"
      : rating - index > 0.2 && rating - index < 0.8
      ? "HALF"
      : rating > index
      ? "FULL"
      : "EMPTY";
  return isHoverable ? (
    <div
      onClick={onClick}
      className="p-0.5"
      role="button"
      onMouseOver={onHover}
    >
      {type === "EMPTY" ? (
        <BsStar className={starSize} />
      ) : type === "HALF" ? (
        <BsStarHalf className={starSize} />
      ) : (
        <BsStarFill className={starSize} />
      )}
    </div>
  ) : (
    <div className="p-0.5">
      {type === "EMPTY" ? (
        <BsStar className={starSize} />
      ) : type === "HALF" ? (
        <BsStarHalf className={starSize} />
      ) : (
        <BsStarFill className={starSize} />
      )}
    </div>
  );
};

interface Props {
  averageRating: number | null;
  productId: string;
  totalRatingCount: number;
}

const Rating = ({ averageRating, productId, totalRatingCount }: Props) => {
  const ctx = api.useUtils();
  const [hoverRating, setHoverRating] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { data: userRating, isLoading: isGettingUserRating } =
    api.rating.getByUserId.useQuery();
  const { mutate: rateProduct, isLoading: isRatingProduct } =
    api.rating.rate.useMutation({
      onSuccess: () => ctx.invalidate(),
    });

  const handleRateProduct = () => {
    rateProduct({ productId, rate: hoverRating + 1 });
  };
  // if no user rating, you can hover
  const isHoverable = !!!userRating;
  const formattedRating = averageRating?.toFixed(1);
  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-2"
    >
      <p className="flex gap-1">
        <span>{formattedRating}</span>

        <span className="font-light text-gray-600">({totalRatingCount})</span>
      </p>
      <div className="flex">
        {[...Array(5).keys()].map((value) => {
          return (
            <Star
              onClick={handleRateProduct}
              key={value}
              index={value}
              isHoverable={isHoverable}
              hoverRating={hoverRating}
              isHovered={isHovered}
              rating={averageRating}
              onHover={() => setHoverRating(value)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Rating;
