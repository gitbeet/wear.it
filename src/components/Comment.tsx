import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
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
  const { user } = useUser();
  const ctx = api.useUtils();
  const { mutate: deleteReview, isLoading: isDeletingReview } =
    api.review.deleteReview.useMutation({
      onSuccess: () => ctx.invalidate(),
    });
  return (
    <div className="grid grid-cols-[64px,1fr] gap-4 py-4">
      <Image
        className="shrink-0"
        src={review.author.profilePicture}
        width={64}
        height={64}
        alt={`${review.author.username}'s profile picture`}
      />
      <div>
        <div className="flex justify-between">
          <p>{review.author.username}</p>
          <Rating
            size="SMALL"
            averageRating={review.review.rate}
            isHoverable={false}
            handleRate={() => void 0}
          />
        </div>

        <div className="h-2"></div>
        <p className="font-light">{review.review.comment}</p>
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
