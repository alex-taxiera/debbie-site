import propTypes from 'prop-types'

export const pageShape = propTypes.shape({
  name: propTypes.string,
  content: propTypes.node
})

export const fourPages = propTypes.shape({
  page1: pageShape,
  page2: pageShape,
  page3: pageShape,
  page4: pageShape
})

export const fivePages = propTypes.shape({
  page1: pageShape,
  page2: pageShape,
  page3: pageShape,
  page4: pageShape,
  page5: pageShape
})

export default {
  pageShape,
  fourPages,
  fivePages
}
