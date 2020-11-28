/**
 * Monitor.js
 */
const chalk = require('chalk');
const { green, cyan, underline } = chalk;

const MONITOR_TITLE = 'Xymatic Task @ v0.0.1';

const log = console.log;

/**
 * Environment variables for monitor
 */
const MONITOR_DEFAULT_WIDTH = 42;

const MONITOR_DEFAULT_SPACEBAR = 3;

const MONITOR_DEFAULT_TOP_LEFT_BORDER = '╭';

const MONITOR_DEFAULT_TOP_RIGHT_BORDER = '╮';

const MONITOR_DEFAULT_BOTTOM_LEFT_BORDER = '╰';

const MONITOR_DEFAULT_BOTTOM_RIGHT_BORDER = '╯';

const MONITOR_DEFAULT_VERTICAL_LINE = '|';

const MONITOR_DEFAULT_HORIZONTAL_LINE = '─';

const MONITOR_NEW_LINE = '\n';

const defaultLineGather = {
  schema: ' ',
  separator: '',
  isSpacebar: false,
};

const monitorLineGather = ({
  schema,
  separator,
  isSpacebar,
} = defaultLineGather) => {
  let mrPX = '';

  const spaceSeparator = separator ? Object.keys(separator).length : 0;
  const spaceSchema = schema ? schema : ' ';
  const spaceBar = isSpacebar ? MONITOR_DEFAULT_SPACEBAR : 0;

  for (
    let _mrPX = '';
    _mrPX < MONITOR_DEFAULT_WIDTH - spaceSeparator - spaceBar;
    _mrPX++
  ) {
    mrPX += spaceSchema;
  }

  return mrPX;
};

const monitorSpaceBuilder = () => {
  return '   ';
};

const monitorTopBuilder = () => {
  let mrPX = '';

  mrPX += MONITOR_DEFAULT_TOP_LEFT_BORDER;

  mrPX += monitorLineGather({
    schema: MONITOR_DEFAULT_HORIZONTAL_LINE,
    isSpacebar: false,
  });

  mrPX += MONITOR_DEFAULT_TOP_RIGHT_BORDER;

  return log(chalk`${MONITOR_NEW_LINE}${monitorSpaceBuilder()}${green(mrPX)}`);
};

const monitorEmptyLineBuilder = () => {
  let mrPX = '';

  mrPX += MONITOR_DEFAULT_VERTICAL_LINE;

  mrPX += monitorLineGather();

  mrPX += MONITOR_DEFAULT_VERTICAL_LINE;

  return log(chalk`${monitorSpaceBuilder()}${green(mrPX)}`);
};

const monitorTitleLineBuilder = (payload) => {
  if (typeof payload !== 'string') return;

  let mrPX = '';

  mrPX += monitorLineGather({ separator: payload, isSpacebar: true });

  mrPX += MONITOR_DEFAULT_VERTICAL_LINE;

  return log(
    chalk`${monitorSpaceBuilder()}${green(
      MONITOR_DEFAULT_VERTICAL_LINE,
    )}${monitorSpaceBuilder()}${underline(payload)}${green(mrPX)}`,
  );
};

const monitorUniversalLineBuilder = (init, payload) => {
  if (typeof payload !== 'string') return;

  const universalSeprator = `▸ ${init}: ${payload}`;

  let mrPX = '';

  mrPX += monitorLineGather({ separator: universalSeprator, isSpacebar: true });

  mrPX += MONITOR_DEFAULT_VERTICAL_LINE;

  return log(
    chalk`${monitorSpaceBuilder()}${green(
      MONITOR_DEFAULT_VERTICAL_LINE,
    )}${monitorSpaceBuilder()}${cyan(`▸ ${init}: `)}${payload}${green(mrPX)}`,
  );
};

const monitorListeningLineBuilder = (host, port) => {
  const listeningSeprator = `Listening: http://${host}:${port}`;

  let mrPX = '';

  mrPX += monitorLineGather({ separator: listeningSeprator, isSpacebar: true });

  mrPX += MONITOR_DEFAULT_VERTICAL_LINE;

  return log(
    chalk`${monitorSpaceBuilder()}${green(
      MONITOR_DEFAULT_VERTICAL_LINE,
    )}${monitorSpaceBuilder()}${cyan.underline(listeningSeprator)}${green(
      mrPX,
    )}`,
  );
};

const monitorBottomBuilder = () => {
  let mrPX = '';

  mrPX += MONITOR_DEFAULT_BOTTOM_LEFT_BORDER;

  mrPX += monitorLineGather({
    schema: MONITOR_DEFAULT_HORIZONTAL_LINE,
    isSpacebar: false,
  });

  mrPX += MONITOR_DEFAULT_BOTTOM_RIGHT_BORDER;

  return log(chalk`${monitorSpaceBuilder()}${green(mrPX)}`);
};

const monitor = (compiler, host, port) => {
  monitorTopBuilder();
  monitorEmptyLineBuilder();
  monitorTitleLineBuilder(MONITOR_TITLE);
  monitorEmptyLineBuilder();
  monitorUniversalLineBuilder('Environment', compiler.mode);
  monitorUniversalLineBuilder('Target', compiler.target);
  monitorEmptyLineBuilder();
  monitorListeningLineBuilder(host, port);
  monitorEmptyLineBuilder();
  monitorBottomBuilder();
};

module.exports = { monitor };
