const defaultState = {
  rad: true,
}

const reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'RAD':
      return {
        ...state,
        rad: payload.rad,
      }
    default:
      return state
  }
}

export default reducer
