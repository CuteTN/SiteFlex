function removeAllChildren(node) {
  if (!node)
    return;

  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

module.exports = {
  removeAllChildren
}