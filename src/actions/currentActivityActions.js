import { TITLE_SET, DESCRIPTION_SET } from '../constants'

export function setTitle(name) {
  return {
    type:TITLE_SET,
    payload:name,
  }
}

export function setDescription(description) {
  return {
    type:DESCRIPTION_SET,
    payload:description,
  }
}