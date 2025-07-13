/*
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
     
    }
  } 
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
