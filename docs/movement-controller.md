# Lumen Astrum
## Movement Controller Design

### Problem
- Player wants to move units
- Units are moved per tick by recalculating pathing and then executing
- Movement dependencies are not considered, i.e. unit A wants to move into unit B, unit B wants to move somewhere else, but unit A ticks before unit B, then unit A finds a new path and might end up pathing the wrong way
- Bad user experience

### Goals
- Painless movement structure, player sets all the targets for each unit, the game makes "best-effort" to get them there (without corrupting game state)

### Movement Controller


