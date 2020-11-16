# Lumen Astrum
## Movement Controller Design

### Problem
- Player wants to move units
- Units are moved per tick by recalculating pathing and then executing
- Movement dependencies are not considered, i.e. unit A wants to move into unit B, unit B wants to move somewhere else, but unit A ticks before unit B, then unit A finds a new path and might end up pathing the wrong way
- Bad user experience

### Goals
- Painless movement structure, player sets all the targets for each unit, the game makes "best-effort" to get them there (without corrupting game state) while minimizing movement range consumed

### General Design 
The general design for the movement controller will be to build some kind of dependency graph and use topological sort to correctly order the tick order to optimally move the units that single tick.

The invariant is that every unit only moves 1 tile per tick, so it only depends on 1 unit.

### Pitfalls
- Directed cycle in the graph, no one can move, should we detect cycles and let the game perform that complex movement? I.e. move one unit out of the way, cycle all the units, then move the one unit back?
  - Have to consider movement range, where it moves to, might move under attack, etc.
- I might set the target "into" a building / immovable structure, we have to check if that structure is dead or not that tick to determine if the unit who is targeted into the building can move or not, which determines if its dependents can move or not
- If a dependent is "blocked", does it retry or just take an alternate path?

### Tentative Plan
- Allow pathfinding in an additional mode: ignore tiles that are occupied by units and generate a path through them anyway, this represents the absolute shortest path if it becomes unblocked
- For each un-dead unit, generate a absolute shortest path even if we go through a unit. Take the first tile in that path and check if there's a unit there. Setup the dependency graph.
- Topological sort, so that every dependent is sorted after it's dependency. 
- For each sorted unit, determine if it's immovable, i.e. a unit is immovable if it's 1-tile target is a structure, or it's dependency is also immovable 
- For immovable units, generate a pathfind to it's target using normal pathfinding.
- This list is now the tick-order for the current action tick, the action tick won't need to re-pathfind, just make a movement command and check that it's valid for each unit.

### Does this address pitfalls?
- Cycles will be considered immovable
- Immovable dependencies are handled
- If a dependent is blocked it immediately takes an alternative path



