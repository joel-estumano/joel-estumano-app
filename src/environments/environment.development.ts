import { IEnvironment } from '@types';
import { environment as baseEnvironment } from './environment';

export const environment: IEnvironment = {
	...baseEnvironment,
	production: false,
	apiUrl: 'https://dev-joel-estumano-api.onrender.com'
};
