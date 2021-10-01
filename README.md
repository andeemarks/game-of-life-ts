<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️-->
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/fire.png)](#conways-game-of-life)

# ➤ Conway's Game of Life

<p align="center">
  <img src="https://github.com/andeemarks/game-of-life-ts/blob/51dd804c57f6b7515f57f1fcb7a6003d802edc48/assets/screenshot.png" alt="Logo" width="300" height="auto" />
</p>

<h1 align="center">game-of-life</h1>

<p align="center">
		<a href="https://david-dm.org/andeemarks/game-of-life-ts"><img alt="Dependencies" src="https://img.shields.io/david/andeemarks/game-of-life-ts.svg" height="20"/></a>
<a href="https://github.com/andeemarks/game-of-life-ts/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/andeemarks/game-of-life-ts.svg" height="20"/></a>
	</p>


<p align="center">
  <b>Typescript version of Conway's Game of Life simulation.  Runs as a CLI application with no user interaction.  Keeps track of the number of new cells that have spawned, died, or thrived per generation.  Automatically stops when the environment reaches entropy (i.e., no further evolution).</b></br>
  <sub><sub>
</p>

<br />



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/fire.png)](#table-of-contents)

## ➤ Table of Contents

* [➤ Conway's Game of Life](#-conways-game-of-life)
	* [➤ Usage](#-usage)
	* [➤ Dependencies](#-dependencies)
	* [➤ Contributors](#-contributors)
	* [➤ License](#-license)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/fire.png)](#usage)

## ➤ Usage

* **test**: yarn lint:types && jest --no-cache
* **lint**: yarn lint:types && yarn lint:ci
* **lint:types**: yarn tsc --noEmit -p .
* **lint:ci**: eslint . --ext .tsx,.ts
* **create**: yarn build
* **game**: yarn build && node lib/src/game-of-life.js
* **build**: tsc -p .


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/fire.png)](#dependencies)

## ➤ Dependencies

* **@types/clear**: ^0.1.2
* **@types/clui**: ^0.3.1
* **@types/figlet**: ^1.5.4
* **box-console**: ^2.0.0
* **chalk**: ^4.1.0
* **clear**: ^0.1.0
* **clui**: ^0.3.6


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/fire.png)](#contributors)

## ➤ Contributors
	

| [Andy Marks](https://twitter.com/andeemarks)     |
|:--------------------------------------------------:|
| [vampwillow@gmail.com](mailto:vampwillow@gmail.com) |



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/fire.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).
