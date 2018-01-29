import * as types from '../../constants/ActionTypes'

export const showSearch = () => ({
  type: types.SHOW_SEARCH
})

export const hideSearch = () => ({
  type: types.HIDE_SEARCH
})

export const updateSearchResult = (searchResult) => ({
  type: types.UPDATE_SEARCH_RESULT,
  searchResult
})

export const setSearchString = (searchString) => ({
  type: types.SET_SEARCH_STRING,
  searchString
})
