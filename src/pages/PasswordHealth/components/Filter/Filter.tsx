import { FC } from 'react';
import { Routes } from "~/constants";
import { ItemCheck } from '~/utils/itemCheck';
import FilterTab from "./components/FilterTab"

import './filter-style.scss';
interface IFilter {
  items: Array<IItem>;
}

const Filter: FC<IFilter> = ({items}) => {
  const weakItemsCount = items.reduce((count, item) => (
    ItemCheck.hasWeakPassword(item) ? (count + 1) : count
  ), 0)

  const reusedItemsCount = items.reduce((count, item) => (
    ItemCheck.hasReusedPassword(item, items) ? (count + 1) : count
  ), 0)

  const oldItemsCount = items.reduce((count, item) => (
    ItemCheck.isOld(item) ? (count + 1) : count
  ), 0)

  return (
    <div className="filter">
      <FilterTab title="Weak" count={weakItemsCount} path={Routes.Weak}/>
      <FilterTab title="Reused" count={reusedItemsCount} path={Routes.Reused}/>
      <FilterTab title="Old" count={oldItemsCount} path={Routes.Old}/>
    </div>
  );
};

export default Filter;
