// @flow
/* eslint-disable no-console */
/**
 * Example application wide utility method.
 */
export default (message: string) => {
  console.log(
    process.env.NODE_ENV === 'production' ? 'Production: ' : 'Development: ',
  )
  console.info(message)
}
