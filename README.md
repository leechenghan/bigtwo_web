## Overview
Built a web app of the game [Big Two](https://en.wikipedia.org/wiki/Big_two) for two players.

In this variant, both players start with 17 cards each. Triples/three-of-a-kinds are not allowed (valid playable combos are single cards, pairs, or 5-card-combos). If a player passes his turn, he/she draws a card from the deck.

A nodejs/express server serves the "public" folder with the game logic and handles communications between clients using websocket rooms. Each game is played in a different room


## Running the program
node server.js

Game clients can join at http://localhost:3000/

## Built with
1. HTML/CSS  
2. jQuery
3. nodejs/ejs
4. socket.io
