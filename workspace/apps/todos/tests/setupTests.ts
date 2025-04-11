// import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { TextEncoder, TextDecoder } from 'util';

fetchMock.enableMocks();
Object.assign(globalThis, { TextDecoder, TextEncoder });
