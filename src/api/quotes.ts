import { useQuery } from "@tanstack/react-query";
const ApiHeaders = {
  "X-Api-Key": "/JIygWDMFzCSnL5qSf9LTg==5rQREesYK8u2megH",
};
type Quote = {
  quote: string;
  author: string;
  category: string;
};
// add this  header to the request
//  add category param to the request
// use use query to fetch the data

export const fetchQuotes = (category: string) =>
  useQuery<Quote[]>({
    queryKey: ["quotes"],
    queryFn: () => {
      return fetch(
        `https://api.api-ninjas.com/v1/quotes?category=${category}`,
        {
          headers: ApiHeaders,
        }
      ).then((res) => res.json());
    },
  });
