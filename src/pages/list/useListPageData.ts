import { useQuery, gql } from '@apollo/client';

import { RestaurantResult, FilterValue } from './types';

export const QUERY = gql`
  query GetListPageData(
    $openNow: Boolean
    $price: String
    $category: String
    $offset: Int
    $limit: Int
  ) {
    restaurants: search(
      # Las Vegas coordinates
      latitude: 36.1699
      longitude: -115.1398
      open_now: $openNow
      price: $price
      categories: $category
      offset: $offset
      limit: $limit
    ) {
      total
      business {
        id
        name
        rating
        categories {
          alias
          title
        }
        price
        isClosed: is_closed
        photos
      }
    }
  }
`;

interface QueryResponse {
  restaurants: {
    total: number;
    business: Array<RestaurantResult>;
  };
}

type QueryParameters = FilterValue & {
  offset: number;
  limit: number;
};

function useListPageData(filters: FilterValue) {
  return useQuery<QueryResponse, QueryParameters>(QUERY, {
    variables: {
      ...filters,
      offset: 0,
      limit: 12,
    },
    notifyOnNetworkStatusChange: true,
  });
}

export default useListPageData;
