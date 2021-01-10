import Button from 'design-system/Button';
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
`;

const LoadMoreButton = styled(Button)`
  width: ${({ theme: { px2rem } }) => px2rem(416)};
  height: ${({ theme: { px2rem } }) => px2rem(48)};
  margin-top: ${({ theme: { px2rem } }) => px2rem(80)};
  align-self: center;
`;

interface ResultsProps {
  restaurantType: string;
  restaurants: Array<RestaurantResult>;
}

function Results({ restaurantType, restaurants }: ResultsProps) {
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
        onClick={() => console.log('Load more')}>
        Load more
      </LoadMoreButton>
    </ResultsWrapper>
  );
}

export default Results;
