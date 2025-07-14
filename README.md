# Marcador de Tenis 🎾

Una aplicación de consola para gestionar y mostrar marcadores de partidos de tenis, desarrollada con TypeScript.

## Características Principales

- **Gestión Completa de Partidos**: Soporte para partidos al mejor de 3 o 5 sets.
- **Reglas Oficiales**: Implementa la puntuación estándar (15, 30, 40, ventaja) y tie-breaks.
- **Control de Servicio**: Gestiona el turno de servicio y las faltas.
- **Interfaz Interactiva**: Un menú de consola para registrar puntos y faltas durante el partido.
- **Determinación de Ganador**: Detecta y anuncia automáticamente al ganador del juego, set y partido.

## Calidad del Código y Pruebas

- **Alta Cobertura de Pruebas**: Más del **90%** del código está cubierto por una suite de tests exhaustiva utilizando **Jest**. Esto garantiza que la lógica del marcador es correcta y previene regresiones.
- **Diseño Modular**: El sistema está diseñado con una clara separación de responsabilidades entre el modelo de dominio (lógica del juego) y la vista (interfaz de usuario).

## Modelo de Dominio

El núcleo de la aplicación se estructura en torno a un modelo de dominio bien definido:

- `Match`: Orquesta el partido completo, gestionando los sets y el estado general.
- `Set`: Representa un set individual.
- `Game`: Clase base para los juegos.
  - `StandardGame`: Implementa la lógica de un juego estándar.
  - `TieBreakGame`: Implementa las reglas de un tie-break.
- `Player`: Representa a un jugador.
- `Service`: Gestiona la lógica del servicio y las faltas.

## Instalación y Uso

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/)

### Pasos

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/MarcosVelasquez/tennis-scoreboard.git
   cd tennis-scoreboard
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Ejecutar la aplicación:**
   Para iniciar un nuevo partido, ejecuta:

   ```bash
   npm run dev
   ```

   La aplicación te guiará para introducir los nombres de los jugadores y configurar el partido.

4. **Ejecutar los tests:**
   Para verificar la integridad del código y ver el informe de cobertura:
   ```bash
   npm test -- --coverage
   ```

## Flujo de la Aplicación

Al iniciar, la aplicación solicita:

1.  Los nombres de los dos jugadores.
2.  El número de sets para el partido (3 o 5).

A continuación, se presenta un menú interactivo para gestionar el partido punto a punto:

- **1. Añadir punto para el sacador**
- **2. Añadir punto para el restador**
- **3. Falta de servicio**
- **4. Salir**

El marcador se actualiza y se muestra en la consola después de cada acción.
