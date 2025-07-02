# Sistema de Marcador de Tenis

Aplicación de consola para gestionar marcadores de partidos de tenis desarrollada en TypeScript.

## Descripción

Este sistema permite a los árbitros gestionar marcadores de partidos de tenis siguiendo las reglas oficiales, incluyendo:

- Gestión de sets (3 o 5 sets por partido)
- Juegos estándar con puntuación 0, 15, 30, 40, AD
- Tie breaks para desempate 6-6
- Control de servicio y faltas
- Determinación automática de ganadores

## Modelo de dominio

El sistema está diseñado siguiendo principios de:
- Comprensibilidad
- Modularidad 
- Extensibilidad

Las clases principales son:
- `Player`: Representa a un jugador
- `Match`: Gestiona el partido completo
- `Set`: Representa un set del partido
- `Game`: Clase abstracta para los juegos
  - `StandardGame`: Implementa las reglas de un juego estándar
  - `TieBreakGame`: Implementa las reglas de un tie break
- `Service`: Gestiona el servicio y las faltas
- `ScoreBoard`: Formatea y muestra el marcador

## Comandos disponibles

- `createPlayer name:<nombre>` - Crea un nuevo jugador
- `readPlayers` - Lista todos los jugadores creados
- `createMatch sets:<3|5>;ids:<id1,id2>` - Crea un nuevo partido
- `match id:<id>` - Cambia el contexto al partido indicado
- `pointService` - Registra un punto para el jugador con servicio
- `pointRest` - Registra un punto para el jugador que resta
- `lackService` - Registra una falta de servicio
- `exit` - Cierra la aplicación

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar la aplicación
npm run dev
```