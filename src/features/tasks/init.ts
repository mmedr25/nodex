import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({ 
    maxRetriesPerRequest: null, 
    host: process.env.REDIS_HOST, 
    port: process.env.REDIS_PORT as unknown as number
});

const myQueue = new Queue('foo');

export async function addJobs() {
    await myQueue.add('myJobName', { foo: 'bar' });
    await myQueue.add('myJobName', { qux: 'baz' });
}


const worker = new Worker(
    'foo',
    async job => {
        // Will print { foo: 'bar'} for the first job
        // and { qux: 'baz' } for the second.
        console.log("this is a job", job.token, job.data);
    },
    { connection },
);

// graceful shutdown
process.on('SIGTERM', async () => {
    await worker.close();
    process.exit(0);
});
