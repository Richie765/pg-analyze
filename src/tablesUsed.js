async function tablesUsed(db, query, params) {
  function nodeWalker(tree) {
    var found = [];

    function checkNode(node) {
      if('Plans' in node) found = found.concat(nodeWalker(node['Plans']));
      if('Relation Name' in node) found.push(node['Relation Name']);
    }

    if(Array.isArray(tree))
      tree.forEach(checkNode)
    else
      checkNode(tree);

    return found;
  }

  let result = await db.one(`EXPLAIN (FORMAT JSON) ${query}`, params);
  let tables = nodeWalker(result['QUERY PLAN'][0]['Plan']);

  // Return deduped

  var seen = {};

  return tables.filter(table => seen.hasOwnProperty(table) ? false : (seen[table] = true) );
}

export default tablesUsed;
export { tablesUsed };
