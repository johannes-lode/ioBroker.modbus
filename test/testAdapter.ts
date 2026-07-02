import path from 'node:path';
import { tests } from '@iobroker/testing';

// Run integration tests: @iobroker/testing starts a fresh js-controller, installs
// this adapter and verifies that the instance starts up successfully (alive state).
tests.integration(path.join(__dirname, '..'));
