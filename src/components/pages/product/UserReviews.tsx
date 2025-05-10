import { useState } from "react";
import ExpandableProductSectionWrapper from "~/components/ui/expandable/ExpandableProductSectionWrapper";
import { api } from "~/utils/api";
import Pagination from "../../ui/Pagination";
import CreateReviewWizard from "~/components/review/CreateReviewWizard";
import { useUser } from "@clerk/nextjs";
import UserReview, { UserReviewSkeleton } from "~/components/review/Review";
import Rating from "~/components/review/Rating";

const REVIEWS_PAGE_SIZE = 2;

const UserReviews = ({ productId }: { productId: string }) => {
  const { user, isSignedIn } = useUser();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: reviews, isLoading: isGettingReviews } =
    api.review.getReviewsByProductId.useQuery({
      productId,
      skip: (currentPage - 1) * REVIEWS_PAGE_SIZE,
      pageSize: REVIEWS_PAGE_SIZE,
    });

  const { data: reviewStats, isLoading: isGettingReviewsStats } =
    api.review.getProductReviewStats.useQuery({
      productId,
    });

  const hasUserCommented =
    reviews?.findIndex((review) => review.author.id === user?.id) !== -1;

  return (
    <ExpandableProductSectionWrapper
      headerChildren={
        <>
          {/* skeleton */}
          {isGettingReviewsStats && (
            <>
              {/* "Reviews (3)" */}
              <div className="h-6 w-24 animate-pulse rounded-full bg-gray-300" />

              <div className="flex animate-pulse items-center gap-4">
                <div className=" flex items-center gap-2">
                  {/* rating */}
                  <div className="h-6 w-12 rounded-full bg-gray-300" />
                  {/* stars */}
                  <div className="h-6 w-24 rounded-full bg-gray-300" />
                </div>
              </div>
            </>
          )}
          {!isGettingReviewsStats && (
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
          )}
        </>
      }
    >
      <>
        <div className="h-4"></div>
        {!hasUserCommented && isSignedIn && (
          <CreateReviewWizard productId={productId} />
        )}
        {isGettingReviews &&
          Array.from(Array(REVIEWS_PAGE_SIZE).keys()).map((review) => (
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
          pageSize={REVIEWS_PAGE_SIZE}
          setCurrentPage={setCurrentPage}
          total={reviewStats?.total ?? 1}
        />
      </>
    </ExpandableProductSectionWrapper>
  );
};

export default UserReviews;
