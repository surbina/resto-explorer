import Button from 'design-system/Button';
import Checkbox from 'design-system/Checkbox';
import Select from 'design-system/Select';
import * as React from 'react';
import styled from 'styled-components';

const FilterWrapper = styled.div`
  padding: ${({ theme: { px2rem } }) => `${px2rem(24)} ${px2rem(64)}`};
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.divider1};
  display: grid;
  grid-template-columns: auto auto auto auto 1fr;
  grid-template-rows: auto;
  column-gap: ${({ theme: { px2rem } }) => px2rem(32)};
`;

const FilterLabel = styled.span`
  font-size: ${({ theme: { px2rem } }) => px2rem(16)};
  line-height: ${({ theme: { px2rem } }) => px2rem(24)};
  color: ${({ theme: { colors } }) => colors.label};
`;

const ClearAllButton = styled(Button)`
  width: ${({ theme: { px2rem } }) => px2rem(150)};
  justify-self: end;
`;
interface FiltersProps {
  filters: {
    openNow: boolean;
    price: string;
    category: string;
  };
  prices: Array<string>;
  categories: Array<string>;
  onChange: (newFilters: {
    openNow: boolean;
    price: string;
    category: string;
  }) => void;
}

function Filters({ filters, prices, categories, onChange }: FiltersProps) {
  return (
    <FilterWrapper>
      <FilterLabel>Filter By:</FilterLabel>
      <Checkbox
        label="Open Now"
        checked={filters.openNow}
        onChange={(openNow) =>
          onChange({
            ...filters,
            openNow,
          })
        }
      />
      <Select
        value={filters.price}
        options={prices}
        onChange={(price) =>
          onChange({
            ...filters,
            price,
          })
        }
      />
      <Select
        value={filters.category}
        options={categories}
        onChange={(category) =>
          onChange({
            ...filters,
            category,
          })
        }
      />
      <ClearAllButton
        variant="outlined"
        onClick={() =>
          onChange({
            openNow: false,
            price: 'All',
            category: 'All',
          })
        }>
        Clear All
      </ClearAllButton>
    </FilterWrapper>
  );
}

export default Filters;
