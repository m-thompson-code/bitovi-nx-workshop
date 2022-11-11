import { ServeExecutorSchema } from './schema';
import { server } from 'moo-stache-helper';

export default async function runExecutor(options: ServeExecutorSchema) {
  console.log('Executor ran for Serve', options);

  await server({
    index: options.index,
    stealConfig: options.stealConfig,
    root: options.root,
    port: options.port
  });

  // Keep server alive forever
  await new Promise(function(){
    /** pass */
  });
}
