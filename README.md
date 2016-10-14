# pg-analyze
Determine which tables are used in a PostgreSQL query.

```javascript
import { tablesUsed } from 'pg-analyze';

async function start() {
  var query = 'SELECT * FROM table1, table2, table3';

  var tables = await tablesUsed(query, params);

  console.log(tables);
}

start();
```
