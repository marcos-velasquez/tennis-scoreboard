import { Player } from './models/player';
import { Match } from './models/match';
import * as readline from 'readline';
import { stdin as input, stdout as output } from 'process';

// Base de datos en memoria para almacenar jugadores y partidos
const players: Player[] = [];
const matches: Match[] = [];

// Interfaz de línea de comandos
const rl = readline.createInterface({ input, output });

// Función para obtener una línea de entrada como Promise
function questionAsync(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

// Función para procesar comandos
async function processCommand(command: string): Promise<void> {
  // Separar el comando y los argumentos
  const parts = command.trim().split(' ');
  const mainCommand = parts[0];
  const args = parts.slice(1);

  // Procesar los argumentos en formato key:value
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

// Implementación de comandos
async function createPlayer(params: Record<string, string>): Promise<void> {
  const { name } = params;
  if (!name) {
    throw new Error('Se requiere el nombre del jugador. Formato: createPlayer name:NombreJugador');
  }

  // Crear un nuevo jugador con ID incremental
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

  // Obtener los IDs de los jugadores
  const playerIds = ids.split(',').map((id) => parseInt(id, 10));
  if (playerIds.length !== 2) {
    throw new Error('Se requieren exactamente dos jugadores para un partido.');
  }

  // Buscar los jugadores en la base de datos
  const matchPlayers = playerIds.map((id) => {
    const player = players.find((p) => p.getId() === id);
    if (!player) {
      throw new Error(`No se encontró ningún jugador con ID: ${id}`);
    }
    return player;
  });

  // Crear el partido
  const match = Match.createMatch(numberOfSets, matchPlayers);
  matches.push(match);

  const id = match.getId();
  console.log(`id:${id}`);
  console.log(`date:${match.getDate().toLocaleDateString('es-ES')}`);
  console.log(match.getScore());
}

// Función auxiliar para encontrar un partido por ID
function findMatchById(matchIdStr: string): Match {
  const matchId = parseInt(matchIdStr, 10);
  const match = matches.find((m) => m.getId() === matchId);
  if (!match) {
    throw new Error(`No se encontró ningún partido con ID: ${matchId}`);
  }
  return match;
}

async function pointService(params: Record<string, string>): Promise<void> {
  // Extraer el ID del partido del contexto actual
  const contextParts = currentContext.split(' ');
  const idPart = contextParts.find((part) => part.startsWith('id:'));
  if (!idPart) {
    throw new Error('No hay un partido seleccionado. Use: match id:X');
  }

  const matchId = idPart.split(':')[1];
  const match = findMatchById(matchId);

  match.pointService();
  console.log(match.getScore());

  // Si el partido ha terminado, mostrar al ganador
  if (match.isFinished()) {
    console.log(`¡Partido finalizado! Ganador: ${match.getWinner()?.getName()}`);
  }
}

async function pointRest(params: Record<string, string>): Promise<void> {
  // Extraer el ID del partido del contexto actual
  const contextParts = currentContext.split(' ');
  const idPart = contextParts.find((part) => part.startsWith('id:'));
  if (!idPart) {
    throw new Error('No hay un partido seleccionado. Use: match id:X');
  }

  const matchId = idPart.split(':')[1];
  const match = findMatchById(matchId);

  match.pointRest();
  console.log(match.getScore());

  // Si el partido ha terminado, mostrar al ganador
  if (match.isFinished()) {
    console.log(`¡Partido finalizado! Ganador: ${match.getWinner()?.getName()}`);
  }
}

async function lackService(params: Record<string, string>): Promise<void> {
  // Extraer el ID del partido del contexto actual
  const contextParts = currentContext.split(' ');
  const idPart = contextParts.find((part) => part.startsWith('id:'));
  if (!idPart) {
    throw new Error('No hay un partido seleccionado. Use: match id:X');
  }

  const matchId = idPart.split(':')[1];
  const match = findMatchById(matchId);

  match.lackService();
  console.log(match.getScore());

  // Si el partido ha terminado, mostrar al ganador
  if (match.isFinished()) {
    console.log(`¡Partido finalizado! Ganador: ${match.getWinner()?.getName()}`);
  }
}

// Gestión del contexto
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

    // Cambiar el contexto si se selecciona un partido
    if (userInput.startsWith('match')) {
      currentContext = userInput;
      console.log(`Contexto cambiado a: ${currentContext}`);
    } else {
      await processCommand(userInput);
    }
  }
}

// Iniciar la aplicación
main().catch((error) => {
  console.error(`Error fatal: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
