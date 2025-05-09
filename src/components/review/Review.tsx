import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { BsTrash } from "react-icons/bs";
import { api, type RouterOutputs } from "~/utils/api";
import Rating from "./Rating";
import NavIcon from "../layout/nav/NavIcon";

export const UserReviewSkeleton = () => (
  <div className="items grid grid-cols-[64px,1fr]  justify-center gap-4 py-4 ">
    <div className="h-16 w-16 rounded-full bg-gray-300" />
    <div>
      <div className="flex justify-between">
        {/* username */}
        <div className="h-3 w-12 rounded-full bg-gray-300" />
        {/* rating stars */}
        <div className="h-3 w-16 rounded-full bg-gray-300" />
      </div>

      <div className="h-4"></div>
      {/* comment (3 lines) */}
      <div className="w-full space-y-1.5">
        <div className="h-3 w-full rounded-full bg-gray-300" />
        <div className="h-3 w-full rounded-full bg-gray-300" />
        <div className="h-3 w-full rounded-full bg-gray-300" />
      </div>

      <div className="h-2"></div>
      <div className=" ml-auto h-3 w-10 rounded-full bg-gray-300" />
    </div>
  </div>
);

dayjs.extend(relativeTime);

interface Props {
  review: RouterOutputs["review"]["getReviewsByProductId"][number];
}

const UserReview = ({ review }: Props) => {
  const commentRef = useRef<HTMLParagraphElement | null>(null);
  const [showFullText, setShowFullText] = useState(false);
  const [showButton, setShowButton] = useState(
    commentRef.current && commentRef.current.scrollHeight > 96,
  );

  useEffect(() => {
    setShowButton(commentRef.current && commentRef.current.scrollHeight > 96);
  }, [commentRef]);

  const { user } = useUser();
  const ctx = api.useUtils();
  const { mutate: deleteReview, isLoading: isDeletingReview } =
    api.review.deleteReview.useMutation({
      onSuccess: () => ctx.invalidate(),
    });

  return (
    <div className="items grid grid-cols-[64px,1fr]  justify-center gap-4 py-4 ">
      <Image
        className="shrink-0 rounded-full"
        src={review.author.profilePicture}
        width={64}
        height={64}
        alt={`${review.author.username}'s profile picture`}
      />
      <div>
        <div className="flex justify-between  ">
          <p className="text-slate-700">{review.author.username}</p>
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
          }  max-w-[calc(100vw-64px-32px-16px-8px)] break-words md:max-w-[calc(100vw-64px-32px-16px-32px)] lg:max-w-[362px]`}
        >
          {review.review.comment}
        </p>
        <div className="h-1"></div>
        {showButton && (
          <p
            role="button"
            onClick={() => setShowFullText((prev) => !prev)}
            className={`font-semibold text-slate-800 underline hover:text-slate-500`}
          >
            {showFullText ? "Less" : "More"}
          </p>
        )}
        <div className="h-2"></div>
        <p className="text-right text-slate-500">
          {dayjs(review.review.createdAt).fromNow()}
        </p>
        <div className="h-4"></div>
        {user?.id === review.author.id && (
          <div className="flex h-10 w-full justify-end">
            <NavIcon
              shape="square"
              variant="danger"
              disabled={isDeletingReview}
              aria-label="Delete review"
              as="button"
              icon={<BsTrash role="button" className="h-5 w-5" />}
              onClick={() => deleteReview({ id: review.review.id })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReview;
