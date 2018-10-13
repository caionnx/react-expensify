export default (auth, {anonymous, connected}) => {
  const { isAnonymous } = auth
  return isAnonymous
    ? Promise.resolve(anonymous())
    : connected()
}
