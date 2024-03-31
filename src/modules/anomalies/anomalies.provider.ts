import { Mongoose } from 'mongoose';
import { AnomalySchema } from './schemas/anomaly.schema';

export const anomaliesProvider = [
  {
    provide: 'ANOMALY_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Anomaly', AnomalySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
