const is_production = process.env.NODE_ENV === 'production';
module.exports = {
    RED_SIDE: 'red',
    BLUE_SIDE: 'blue',
    RED_CHAT_COLOR: 'red',
    BLUE_CHAT_COLOR: 'dodgerblue',
    NONE_SIDE: 'none',
    STARTING_GOLD: is_production ? 1000 : 10000,
    BUILD_RANGE: 4,
    BUILDING_VISION_RANGE: 5,
    SUPER_VISION_VALUE: 10000,
    TIME_IN_SECONDS_BEFORE_GAME_START: 3,
    IS_PRODUCTION: is_production
};
