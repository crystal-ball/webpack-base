/**
 * Example application wide utility method.
 */
export default message => {
  console.log(
    process.env.NODE_ENV === 'production' ? 'Production: ' : 'Development: ',
  )
  console.info(message)
}
