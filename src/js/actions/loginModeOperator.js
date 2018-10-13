export default (auth, {anonymous = () => null, connected = () => null} = {}) => {
  const { isAnonymous } = auth
  return isAnonymous
    ? Promise.resolve(anonymous())
    : connected()
}
