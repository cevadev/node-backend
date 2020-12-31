function buildMessage(entity, action) {
  if (action === 'list') {
    //si la entiedad es movie y accion list retornamos movie listed
    return `${entity}s ${action}ed`;
  }

  //si la entidad es movie y la accion create retornamos movie created
  return `${entity} ${action}d`;
}

module.exports = buildMessage;
