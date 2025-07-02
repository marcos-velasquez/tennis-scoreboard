import * as readline from 'readline';
import { stdin, stdout } from 'process';
import { Input } from './input';
import { Output } from './output';

const io = readline.createInterface({ input: stdin, output: stdout });
export const input = new Input(io);
export const output = new Output(io);
