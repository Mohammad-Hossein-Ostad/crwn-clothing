import { CATEGORIES_ACTION_TYPES } from './category.types';

const CATEGOIRES_INITIAL_VALUE = {
  categories: [],
};

export const categoriesReducer = (
  state = CATEGOIRES_INITIAL_VALUE,
  action = {},
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    default:
      return state;
  }
};
