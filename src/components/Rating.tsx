import React, { useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { api } from "~/utils/api";

type StarType = "EMPTY" | "HALF" | "FULL";
type StarSize = "SMALL" | "LARGE";

const Star = ({
  index,
  isHoverable,
  onHover,
  hoverRating,
  isHovered,
  rating,
  onClick,
  size,
}: {
  index: number;
  isHoverable: boolean;
  isHovered: boolean;
  hoverRating: number;
  onClick: () => void;
  onHover: () => void;
  rating: number | undefined;
  size: StarSize;
}) => {
  const starSize = size === "LARGE" ? "h-5 w-5" : "h-4 w-4";
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
  averageRating: number | undefined;
  isHoverable: boolean;
  handleRate: (rating: number) => void;
  size?: StarSize;
}

const Rating = ({
  averageRating,
  isHoverable,
  handleRate,
  size = "LARGE",
}: Props) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-2"
    >
      <div className="flex">
        {[...Array(5).keys()].map((value) => {
          return (
            <Star
              size={size}
              onClick={() => handleRate(value + 1)}
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
