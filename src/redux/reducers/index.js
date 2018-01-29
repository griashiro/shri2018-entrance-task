import { combineReducers } from 'redux'
import datetime from './datetime'
import calendar from './calendar'
import cloud from './cloud'
import form from './form'
import search from './search'
import dialog from './dialog'
import gui from './gui'
import select from './select'
import validated from './validated'
import focus from './focus'
import api from './api'

export default combineReducers({
  datetime,
  calendar,
  cloud,
  form,
  search,
  dialog,
  gui,
  select,
  validated,
  focus,
  api
})
