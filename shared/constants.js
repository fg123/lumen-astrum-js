const is_production = process.env.NODE_ENV === 'production';

module.exports = {
    RED_CHAT_COLOR: 'red',
    BLUE_CHAT_COLOR: 'dodgerblue',
    YELLOW_CHAT_COLOR: '#f0e130',
    STARTING_GOLD: is_production ? 1000 : 100000,
    BUILD_RANGE: 3,
    TIME_IN_SECONDS_BEFORE_GAME_START: is_production ? 10 : 3,
    IS_PRODUCTION: is_production,
    PROBE_RANGE: 1,
    BRUSH_VISION: 2,
    MAP_TILE_DRAW_X_MULTIPLIER: 96,
    MAP_TILE_DRAW_Y_MULTIPLIER: 111,
    PHASE_ACTION: 'phase_action',
    PHASE_PLANNING: 'phase_planning',
    PLANNING_TIME: is_production ? 20 : 5,
    ACTION_MAX_TIME: 10,
    TIME_BEFORE_ACTION_TO_PLANNING: is_production ? 1 : 0,
    OUT_OF_COMBAT_TIME: 4
};
