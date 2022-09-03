/**
 * @param {string} str 
 * @param {string} replacement 
 * @returns 
 */
function replaceAll(str, keywork, replaceWith) {
  return str.split(keywork).join(replaceWith || '');
}

function chainReplaceAll(str, keywork, replaceWith, ...rest) {
  const result = replaceAll(str, keywork, replaceWith);
  if(rest.length > 0) 
    return chainReplaceAll(result, ...rest)
  else
    return result
}

module.exports = {
  replaceAll,
  chainReplaceAll
}