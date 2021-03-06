import Button from 'design-system/Button';
import LoadingIndicator from 'design-system/LoadingIndicator';
import Subtitle from 'design-system/Subtitle';
import * as React from 'react';
import styled from 'styled-components';

import RestaurantTile from './RestaurantTile';
import { RestaurantResult } from './types';

const ResultsWrapper = styled.section`
  padding: ${({ theme: { px2rem } }) => px2rem(64)};
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  column-gap: ${({ theme: { px2rem } }) => px2rem(32)};
  row-gap: ${({ theme: { px2rem } }) => px2rem(80)};

  ${({
    theme: {
      mediaQueryBreakPoints: { mobile, tablet, laptop },
    },
  }) => `
    @media (max-width: ${laptop}) {
      grid-template-columns: repeat(3, auto);
    }

    @media (max-width: ${tablet}) {
      grid-template-columns: repeat(2, auto);
    }

    @media (max-width: ${mobile}) {
      grid-template-columns: auto;
    }
  `}
`;

const LoadMoreButton = styled(Button)`
  width: ${({ theme: { px2rem } }) => px2rem(416)};
  height: ${({ theme: { px2rem } }) => px2rem(48)};
  margin-top: ${({ theme: { px2rem } }) => px2rem(80)};
  align-self: center;
`;

interface ResultsProps {
  restaurantType: string;
  restaurantsCount: number;
  restaurants: Array<RestaurantResult>;
  onLoadMore: () => void;
  isLoadingMore: boolean;
}

function Results({
  restaurantType,
  restaurantsCount,
  restaurants,
  onLoadMore,
  isLoadingMore,
}: ResultsProps) {
  const disableLoadMore =
    isLoadingMore || restaurants.length >= restaurantsCount;

  return (
    <ResultsWrapper>
      <Subtitle>{restaurantType} Restaurants</Subtitle>
      <Grid>
        {restaurants.map((restaurant) => (
          <RestaurantTile key={restaurant.id} {...restaurant} />
        ))}
      </Grid>
      <LoadMoreButton
        variant="outlined"
        onClick={onLoadMore}
        disabled={disableLoadMore}>
        {isLoadingMore ? (
          <LoadingIndicator size={15} rippleSize={12} />
        ) : (
          'Load more'
        )}
      </LoadMoreButton>
    </ResultsWrapper>
  );
}

export default Results;
