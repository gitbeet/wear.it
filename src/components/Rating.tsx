import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

type StarType = "EMPTY" | "HALF" | "FULL";

const Star = ({ type }: { type: StarType }) => {
  return type === "EMPTY" ? (
    <BsStar />
  ) : type === "HALF" ? (
    <BsStarHalf />
  ) : (
    <BsStarFill />
  );
};

interface Props {
  rating: number | undefined;
}

const Rating = ({ rating }: Props) => {
  return (
    <div className="flex gap-1">
      {[...Array(5).keys()].map((star) => {
        const type: StarType = !rating
          ? "EMPTY"
          : rating - star > 0.2 && rating - star < 0.8
          ? "HALF"
          : rating > star
          ? "FULL"
          : "EMPTY";
        return <Star key={star} type={type} />;
      })}
    </div>
  );
};

export default Rating;
