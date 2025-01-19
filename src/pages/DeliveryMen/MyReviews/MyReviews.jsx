import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

import useAllReviews from "@/src/hooks/useAllRevies";
import Loading from "@/src/components/custom/Loading/Loading";

const MyReviews = () => {
  const { reviews, refetch, isLoading, isPending } = useAllReviews();
  console.log(reviews,"hello ")

  if (isLoading) {
    return (
      <Loading></Loading>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews?.map((review) => (
        <Card
          key={review._id}
          className="p-4 transition-transform transform hover:scale-105 shadow-lg rounded-lg bg-white"
        >
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gray-100 p-1.5">
                <img
                  src={`https://ui-avatars.com/api/?name=${review.name}&background=random`}
                  alt={review.name}
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {review.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(review.bookingDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="flex items-center gap-1">
              {/* <Rating name="read-only" value={review.rating} readOnly /> */}
            </div>
            <p className="mt-3 text-gray-600">{review.feedback}</p>
            <Badge
              className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
              title={review.email}
            >
              {review.email}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyReviews;
