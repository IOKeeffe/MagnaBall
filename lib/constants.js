const constants = {
  NORMAL_FRAME_TIME_DELTA:16.667,

  DEFAULT_MAGNET_COLUMN_LENGTHS: [1, 2, 3, 4],

  MAGNET_COLLISION_ENABLED: true,
  FUN_MAGNETS: false,
  WINNING_SCORE: 3,

  AI_OFFSET: 543.2,
  KEYS: ["a","j","s","d","k","l","f",";"],

  P1_COLOR: "#5A0202",
  P2_COLOR: "#0D254B",
  MAGNET_STRENGTH: 5,
  MAGNET_RANGE: 110,
  MAGNET_RECHARGE_TIME: 1000,

  MAGNETIC_FIELD_PULSES: 10,

  NUMBER_OF_PUCKS: 1,

  BG_COLOR: '#E3E3E3',
  FIELD_DIM_X: screen.width * .667,
  FIELD_DIM_Y: (screen.height * .667) - 30,
  FIELD_POS_OFFSET_X: 10,
  FIELD_POS_OFFSET_Y: 10,

  GOAL_HEIGHT: 300,
  GOAL_WIDTH: 20,
  GOAL_COLOR_1: "#FFFFFF",
  GOAL_COLOR_2: "#FFF",

  C_O_F: 0.005,
  PUCK_COLOR: 'DDDDDD',
};
let fieldDimensions = constants.FIELD_DIM_X / constants.FIELD_DIM_Y;

constants.PULSE_RANGE = fieldDimensions * 33.75;
constants.MAGNET_RADIUS = fieldDimensions * 11.25;
constants.PULSE_SPEED = 4;
constants.PUCK_INITIAL_VELOCITY_FACTOR = fieldDimensions * 2.8125;
constants.MAX_PUCK_SPEED = fieldDimensions * 42.352;

constants.MAGNET_RANGE = fieldDimensions * 61.877;
constants.MAGNET_FONT_SIZE = `${fieldDimensions * 19.726}px`

constants.PUCK_RADIUS = fieldDimensions * 11.25;


constants.CHOSEN_MAGNET_POSITIONS = constants.DEFAULT_MAGNET_COLUMN_LENGTHS

constants.ZONE_WIDTH = (constants.FIELD_DIM_X / 8);
constants.ZONE_BORDERS = [];
for (var i = 1; i < 9; i++) {
  constants.ZONE_BORDERS.push(constants.ZONE_WIDTH * i);
}

constants.MAGNET_X_POSITIONS = constants.ZONE_BORDERS.map((border) => {
  return border - (constants.ZONE_WIDTH / 2)
});

constants.GOAL_OFFSET_X = (constants.GOAL_WIDTH / 2);
constants.GOAL_Y = ( constants.FIELD_DIM_Y / 2 ) - (constants.GOAL_HEIGHT / 2);
constants.GOAL_PUCK_TOP_BOUNDARY = constants.GOAL_Y + constants.PUCK_RADIUS;
constants.GOAL_PUCK_BOTTOM_BOUNDARY = constants.GOAL_Y + constants.GOAL_HEIGHT - constants.PUCK_RADIUS;

export default constants;
