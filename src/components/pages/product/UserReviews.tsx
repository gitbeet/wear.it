import { useState } from "react";
import ExpandableProductSectionWrapper from "~/components/ui/expandable/ExpandableProductSectionWrapper";
import { api } from "~/utils/api";
import Pagination from "../../ui/Pagination";
import CreateReviewWizard from "~/components/review/CreateReviewWizard";
import { useUser } from "@clerk/nextjs";
import UserReview, { UserReviewSkeleton } from "~/components/review/Review";
import Rating from "~/components/review/Rating";

const PAGE_SIZE = 2;

const UserReviews = ({ productId }: { productId: string }) => {
  const { user, isSignedIn } = useUser();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: reviews, isLoading: isGettingReviews } =
    api.review.getReviewsByProductId.useQuery({
      productId,
      skip: (currentPage - 1) * PAGE_SIZE,
      pageSize: PAGE_SIZE,
    });

  const { data: reviewStats, isLoading: isGettingTotal } =
    api.review.getProductReviewStats.useQuery({
      productId,
    });

  const hasUserCommented =
    reviews?.findIndex((review) => review.author.id === user?.id) !== -1;

  return (
    <ExpandableProductSectionWrapper
      headerChildren={
        <>
          <p className="text-2xl font-semibold">
            Reviews ({reviewStats?.total})
          </p>
          <div className="flex items-center gap-4">
            <div className=" flex items-center gap-2">
              <p className="flex gap-1">
                <span>{reviewStats?.averageRating?.toFixed(1)}</span>
              </p>
              <Rating
                handleRate={() => void 0}
                isHoverable={false}
                averageRating={reviewStats?.averageRating ?? 2.5}
              />
            </div>
          </div>
        </>
      }
    >
      <>
        <div className="h-4"></div>
        {!hasUserCommented && isSignedIn && (
          <CreateReviewWizard productId={productId} />
        )}
        {isGettingReviews &&
          Array.from(Array(PAGE_SIZE).keys()).map((review) => (
            <UserReviewSkeleton key={review} />
          ))}
        {!isGettingReviews && (
          <div className="pl-2">
            {reviews?.map((review) => (
              <UserReview key={review.review.id} review={review} />
            ))}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          setCurrentPage={setCurrentPage}
          total={reviewStats?.total ?? 1}
        />
      </>
    </ExpandableProductSectionWrapper>
  );
};

export default UserReviews;
