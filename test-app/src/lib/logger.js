/* eslint-disable no-console */
/**
 * Example application wide utility method.
 */
export default message => {
  if (process.env.DEBUG) console.log('Extra logging: ')
  console.info(message)
}
