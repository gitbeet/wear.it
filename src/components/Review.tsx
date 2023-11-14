import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { BsTrash } from "react-icons/bs";
import { api, type RouterOutputs } from "~/utils/api";
import Rating from "./Rating";

dayjs.extend(relativeTime);

interface Props {
  review: RouterOutputs["review"]["getReviewsByProductId"][number];
}

const Review = ({ review }: Props) => {
  const [showFullText, setShowFullText] = useState(false);
  const commentRef = useRef<HTMLParagraphElement | null>(null);
  const { user } = useUser();
  const ctx = api.useUtils();
  const { mutate: deleteReview, isLoading: isDeletingReview } =
    api.review.deleteReview.useMutation({
      onSuccess: () => ctx.invalidate(),
    });

  return (
    <div className="grid grid-cols-[64px,1fr] gap-4 py-4">
      <Image
        className="shrink-0 rounded-sm"
        src={review.author.profilePicture}
        width={64}
        height={64}
        alt={`${review.author.username}'s profile picture`}
      />
      <div>
        <div className="flex justify-between">
          <p className="text-gray-700">{review.author.username}</p>
          <Rating
            size="SMALL"
            averageRating={review.review.rate}
            isHoverable={false}
            handleRate={() => void 0}
          />
        </div>

        <div className="h-4"></div>
        <p
          ref={commentRef}
          className={`${
            showFullText ? "max-h-none" : "max-h-[6rem]  overflow-hidden"
          }`}
        >
          {review.review.comment}
        </p>
        <div className="h-1"></div>
        {commentRef.current && commentRef.current.scrollHeight > 96 && (
          <p
            role="button"
            onClick={() => setShowFullText((prev) => !prev)}
            className={`font-semibold text-gray-800 underline hover:text-gray-500`}
          >
            {showFullText ? "Less" : "More"}
          </p>
        )}
        <div className="h-2"></div>
        <p className="text-right text-gray-500">
          {dayjs(review.review.createdAt).fromNow()}
        </p>
        <div className="h-4"></div>
        {user?.id === review.author.id && (
          <div className="flex w-full justify-end">
            <button disabled={isDeletingReview}>
              <BsTrash
                onClick={() => deleteReview({ id: review.review.id })}
                role="button"
                className="h-5 w-5 text-gray-800"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
