# JavaScript/Node.js Data Handling – Cheatsheet

A compact, practical reference for manipulating data in JS/Node.js. Copy freely. ✨

---

## Arrays – Core Patterns

### Create / Clone
```js
const a = [1,2,3];
const clone = [...a];
const withExtra = [...a, 4];
```

### Map / Filter / Reduce
```js
const xs = [1, 2, 3, 4];
const doubled = xs.map(x => x * 2);
const evens = xs.filter(x => x % 2 === 0);
const sum = xs.reduce((acc, x) => acc + x, 0);
```

### Find / Some / Every
```js
xs.find(x => x > 2);        // 3
xs.some(x => x < 0);        // false
xs.every(x => x > 0);       // true
```

### Sort (stable since V8 7.0 / Node 12+)
```js
const byAsc = [...xs].sort((a, b) => a - b);
const byDesc = [...xs].sort((a, b) => b - a);

// sort by field
items.sort((a,b) => a.price - b.price || a.name.localeCompare(b.name));
```

### Flat / flatMap
```js
[[1],[2,3]].flat();         // [1,2,3]
['a b','c'].flatMap(s => s.split(' ')); // ["a","b","c"]
```

### Unique / Intersection / Difference
```js
const uniq = arr => [...new Set(arr)];
const intersect = (a,b) => a.filter(x => new Set(b).has(x));
const diff = (a,b) => a.filter(x => !new Set(b).has(x));
```

### Chunk / GroupBy (portable)
```js
const chunk = (arr, size) =>
  Array.from({length: Math.ceil(arr.length/size)}, (_,i) => arr.slice(i*size, (i+1)*size));

const groupBy = (arr, keyFn) =>
  arr.reduce((acc, x) => ((acc[keyFn(x)] ??= []).push(x), acc), {});

// Example
const byYear = groupBy(people, p => new Date(p.dob).getFullYear());
```

### Zip / IndexBy
```js
const zip = (a,b) => a.map((x,i) => [x, b[i]]);
const indexBy = (arr, keyFn) =>
  arr.reduce((m, x) => (m.set(keyFn(x), x), m), new Map());
```

### Stable Pagination
```js
function paginate(arr, page=1, size=20) {
  const start = (page-1)*size;
  return arr.slice(start, start+size);
}
```

---

## Objects – Patterns

### Destructuring / Rest
```js
const user = { id:1, name:'Ana', role:'admin' };
const { id, ...rest } = user; // rest={name, role}
```

### Safe Access / Defaults
```js
const city = user.address?.city ?? 'N/A';
```

### Convert Object <-> Entries
```js
Object.entries(user); // [["id",1],["name","Ana"]]
Object.fromEntries([['a',1],['b',2]]); // {a:1, b:2}
```

### Deep Clone (structuredClone, Node 17+)
```js
const deep = structuredClone(obj);
```

---

## Dates & Time

```js
const d = new Date('2025-08-27');
const isoMonth = d.toISOString().slice(0,7); // "2025-08"

// Format with Intl.DateTimeFormat
new Intl.DateTimeFormat('es-MX', { dateStyle:'medium' }).format(d);

// First/last day of month
const first = new Date(d.getFullYear(), d.getMonth(), 1);
const last  = new Date(d.getFullYear(), d.getMonth()+1, 0);
```

---

## Numbers & Currency

```js
const mxn = new Intl.NumberFormat('es-MX', { style:'currency', currency:'MXN' });
mxn.format(12345.67); // "$12,345.67"

// Precise sums
const total = amounts.reduce((a,x) => a + Number(x), 0);
```

---

## Text

```js
'  abc  '.trim();
'Álvaro'.toLocaleLowerCase('es'); // locale-aware
'00123'.padStart(5, '0');
```

---

## Sets & Maps

```js
const s = new Set([1,2,2,3]); // size 3
const m = new Map([['a',1], ['b',2]]);
for (const [k,v] of m) { /* ... */ }
```

---

## JSON, CSV, TSV

```js
// JSON
const obj = JSON.parse(jsonString);
const text = JSON.stringify(obj, null, 2);

// CSV (simple)
const toCSV = (rows) => [
  Object.keys(rows[0]).join(','),
  ...rows.map(r => Object.values(r).map(v => `"${String(v).replaceAll('"','""')}"`).join(','))
].join('\n');
```

---

## Node.js FS (promises)

```js
import { readFile, writeFile } from 'node:fs/promises';

const text = await readFile('input.json', 'utf8');
const data = JSON.parse(text);
await writeFile('out.csv', toCSV(data), 'utf8');
```

---

## Fetch (Node 18+)

```js
const res = await fetch('https://api.example.com/items');
if (!res.ok) throw new Error('HTTP ' + res.status);
const data = await res.json();
```

---

## Async Patterns

### Parallel with limit
```js
async function mapLimit(items, limit, worker) {
  const ret = [];
  const it = items.entries();
  const workers = Array.from({length: limit}, async function run() {
    for (const [i, item] of it) ret[i] = await worker(item, i);
  });
  await Promise.all(workers);
  return ret;
}
```

### Retry w/ Backoff
```js
async function retry(fn, attempts=3) {
  let err;
  for (let i=0;i<attempts;i++) {
    try { return await fn(); }
    catch (e) { err = e; await new Promise(r => setTimeout(r, 2**i * 250)); }
  }
  throw err;
}
```

---

## Streams (basic)

```js
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

await pipeline(
  createReadStream('big.csv'),
  createWriteStream('copy.csv')
);
```

---

## Validation (AJV quickstart)

```bash
npm i ajv
```

```js
import Ajv from 'ajv';
const ajv = new Ajv();
const schema = {
  type: 'object',
  required: ['id','monto'],
  properties: {
    id: { type:'integer', minimum:1 },
    monto: { type:'number', minimum:0 }
  },
  additionalProperties: false
};
const validate = ajv.compile(schema);
if (!validate(input)) console.log(validate.errors);
```

---

## Data Tasks – Recipes

### Group sales by agent+month with commission
```js
function groupSales(sales, agents, insurances, commissions) {
  const byKey = {};
  const rateByType = Object.fromEntries(commissions.map(c => [c.tipo, c.porcentaje]));
  const insuranceById = Object.fromEntries(insurances.map(s => [s.id, s]));
  const agentById = Object.fromEntries(agents.map(a => [a.id, a]));

  for (const v of sales) {
    const agent = agentById[v.agenteId];
    const seguro = insuranceById[v.seguroId];
    if (!agent || !seguro || !Number.isFinite(v.monto)) continue; // sanity
    const mes = String(v.fecha).slice(0,7);
    const rate = rateByType[seguro.tipo] ?? 0;
    const key = `${mes}-${agent.nombre}`;
    const comision = v.monto * rate;

    byKey[key] ??= { mes, agente: agent.nombre, totalVentas: 0, totalComisiones: 0, detalle: [] };
    byKey[key].totalVentas += v.monto;
    byKey[key].totalComisiones += comision;
    byKey[key].detalle.push({ tipo: seguro.id, monto: v.monto, comision });
  }
  return Object.values(byKey);
}
```

### Pretty print deeply
```js
const pretty = x => console.log(JSON.stringify(x, null, 2));
```

---

## Gotchas

- `Array.sort()` muta el array; clona antes de ordenar.
- `new Date('YYYY-MM')` se interpreta como UTC; cuida TZ.
- No mezcles `await` dentro de `Array.map`; usa `for...of` o `mapLimit`.
- Valida entradas externas; nunca confíes en shape/tipos.
- Usa `??` (nullish coalescing) en vez de `||` cuando `0` es válido.
- Para grandes volúmenes, usa streams o bases/engines (SQLite, DuckDB, Postgres).

---

## Useful Flags & Tools

- Run ESM in Node: add `"type": "module"` to `package.json`.
- Enable TS strictness: `"strict": true` in `tsconfig.json`.
- Measure: `console.time('t'); /*...*/ console.timeEnd('t');`

---

© 2025 – Data Handling Cheatsheet (JS/Node).
