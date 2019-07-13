/* eslint-disable no-console */
/**
 * Example application wide utility method.
 */
const logger = message => {
  if (process.env.DEBUG) console.log('Extra logging: ')
  console.info(message)
}

export default logger
