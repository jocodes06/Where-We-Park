export default async function getReviews() {
  const response = await fetch("/api/reviews", {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return {
    reviews: Array.isArray(data) ? data : [],
  };
}
