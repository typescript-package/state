const { performance } = require('perf_hooks');

import { SelectablePrivate } from '../lib/selectable/selectable-private.abstract';
import { SelectableWeakMap } from '../lib/selectable/selectable-weak-map.abstract';


// Benchmark function
function benchmark(label: any, ClassType: any) {
  const instances = [];
  const startMemory = process.memoryUsage().heapUsed;
  const startTime = performance.now();
  
  for (let i = 0; i < 1_000_000; i++) {
    const instance = new ClassType();
    instance.select();
    instance.deselect();
    instance.toggle();
    instances.push(instance);
  }
  
  const endTime = performance.now();
  const endMemory = process.memoryUsage().heapUsed;
  
  console.log(`${label} - Time: ${(endTime - startTime).toFixed(2)}ms, Memory: ${(endMemory - startMemory) / 1024 / 1024} MB`);
}

console.log('Running benchmarks...');
benchmark('WeakMap', SelectableWeakMap);
benchmark('Private Fields', SelectablePrivate);
