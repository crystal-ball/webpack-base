// @flow
/* eslint-disable no-console */
/**
 * Example application wide utility method.
 */
export default (message: string) => {
  if (process.env.DEBUG) console.log('Extra logging: ')
  console.info(message)
}
