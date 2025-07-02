/* import { Player } from './models/player';
import { Match } from './models/match';
import * as readline from 'readline';
import { stdin as input, stdout as output } from 'process';


const players: Player[] = [];
const matches: Match[] = [];


const rl = readline.createInterface({ input, output });

// Función para obtener una línea de entrada como Promise
function questionAsync(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}


async function processCommand(command: string): Promise<void> {

  const parts = command.trim().split(' ');
  const mainCommand = parts[0];
  const args = parts.slice(1);


  const params: Record<string, string> = {};
  for (const arg of args) {
    const [key, value] = arg.split(':');
    if (key && value) {
      params[key] = value;
    }
  }

  try {
    switch (mainCommand) {
      case 'createPlayer':
        await createPlayer(params);
        break;
      case 'readPlayers':
        await readPlayers();
        break;
      case 'createMatch':
        await createMatch(params);
        break;
      case 'pointService':
        await pointService(params);
        break;
      case 'pointRest':
        await pointRest(params);
        break;
      case 'lackService':
        await lackService(params);
        break;
      case 'exit':
        console.log('¡Hasta luego!');
        rl.close();
        process.exit(0);
        break;
      default:
        console.log(`Comando desconocido: ${mainCommand}`);
        console.log(
          'Comandos disponibles: createPlayer, readPlayers, createMatch, pointService, pointRest, lackService, exit',
        );
    }
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}


async function createPlayer(params: Record<string, string>): Promise<void> {
  const { name } = params;
  if (!name) {
    throw new Error('Se requiere el nombre del jugador. Formato: createPlayer name:NombreJugador');
  }

  
  const id = players.length + 1;
  const player = new Player(id, name);
  players.push(player);

  console.log(`Jugador creado con éxito: ${name}, ID: ${id}`);
}

async function readPlayers(): Promise<void> {
  if (players.length === 0) {
    console.log('No hay jugadores registrados.');
    return;
  }

  for (const player of players) {
    console.log(`name:${player.getName()}; id:${player.getId()}`);
  }
}

async function createMatch(params: Record<string, string>): Promise<void> {
  const { sets, ids } = params;
  console.log(sets, ids);
  if (!sets || !ids) {
    throw new Error('Se requiere número de sets y IDs de jugadores. Formato: createMatch sets:3;ids:1,2');
  }

  const numberOfSets = parseInt(sets, 10);
  if (numberOfSets !== 3 && numberOfSets !== 5) {
    throw new Error('El número de sets debe ser 3 o 5');
  }


  const playerIds = ids.split(',').map((id) => parseInt(id, 10));
  if (playerIds.length !== 2) {
    throw new Error('Se requieren exactamente dos jugadores para un partido.');
  }


  const matchPlayers = playerIds.map((id) => {
    const player = players.find((p) => p.getId() === id);
    if (!player) {
      throw new Error(`No se encontró ningún jugador con ID: ${id}`);
    }
    return player;
  });


  const match = Match.createMatch(numberOfSets, matchPlayers);
  matches.push(match);

  const id = match.getId();
  console.log(`id:${id}`);
  console.log(`date:${match.getDate().toLocaleDateString('es-ES')}`);
  console.log(match.getScore());
}


function findMatchById(matchIdStr: string): Match {
  const matchId = parseInt(matchIdStr, 10);
  const match = matches.find((m) => m.getId() === matchId);
  if (!match) {
    throw new Error(`No se encontró ningún partido con ID: ${matchId}`);
  }
  return match;
}

async function pointService(params: Record<string, string>): Promise<void> {

  const contextParts = currentContext.split(' ');
  const idPart = contextParts.find((part) => part.startsWith('id:'));
  if (!idPart) {
    throw new Error('No hay un partido seleccionado. Use: match id:X');
  }

  const matchId = idPart.split(':')[1];
  const match = findMatchById(matchId);

  match.pointService();
  console.log(match.getScore());


  if (match.isFinished()) {
    console.log(`¡Partido finalizado! Ganador: ${match.getWinner()?.getName()}`);
  }
}

async function pointRest(params: Record<string, string>): Promise<void> {

  const contextParts = currentContext.split(' ');
  const idPart = contextParts.find((part) => part.startsWith('id:'));
  if (!idPart) {
    throw new Error('No hay un partido seleccionado. Use: match id:X');
  }

  const matchId = idPart.split(':')[1];
  const match = findMatchById(matchId);

  match.pointRest();
  console.log(match.getScore());


  if (match.isFinished()) {
    console.log(`¡Partido finalizado! Ganador: ${match.getWinner()?.getName()}`);
  }
}

async function lackService(params: Record<string, string>): Promise<void> {

  const contextParts = currentContext.split(' ');
  const idPart = contextParts.find((part) => part.startsWith('id:'));
  if (!idPart) {
    throw new Error('No hay un partido seleccionado. Use: match id:X');
  }

  const matchId = idPart.split(':')[1];
  const match = findMatchById(matchId);

  match.lackService();
  console.log(match.getScore());

  
  if (match.isFinished()) {
    console.log(`¡Partido finalizado! Ganador: ${match.getWinner()?.getName()}`);
  }
}


let currentContext = '';

async function main(): Promise<void> {
  console.log('Sistema de Marcador de Tenis');
  console.log('---------------------------');
  console.log('Comandos disponibles:');
  console.log('createPlayer name:NombreJugador');
  console.log('readPlayers');
  console.log('createMatch sets:3;ids:1,2');
  console.log('pointService, pointRest, lackService (dentro del contexto de un partido)');
  console.log('exit');
  console.log('---------------------------');

  while (true) {
    const prompt = currentContext ? `${currentContext}> ` : '> ';
    const userInput = await questionAsync(prompt);

   
    if (userInput.startsWith('match')) {
      currentContext = userInput;
      console.log(`Contexto cambiado a: ${currentContext}`);
    } else {
      await processCommand(userInput);
    }
  }
}


main().catch((error) => {
  console.error(`Error fatal: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
 */

import { TennisScoreboard } from './tennis-scoreboard';

new TennisScoreboard().start();
