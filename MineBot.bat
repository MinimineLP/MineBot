@echo off
if '%1%' == 'install' (
  npm install
) else if '%1%' == 'i' (
  npm install
) else if '%1%' == 'start' (
  npm start
) else if '%1%' == 's' (
  npm start
) else if '%1%' == 'loopstart' (
  goto loopstart
) else if '%1%' == 'l' (
  goto loopstart
) else if '%1%' == 'ls' (
  goto loopstart
) else if '%1%' == 'help' (
  goto help
) else if '%1%' == 'h' (
  goto help
) else (
  echo this subcommand does not exists
  goto help
)
echo.
echo Action ready
goto end

:help
echo MineBot help. Here you find a list of all sub-commands
echo.
echo  h         -   shows this help list
echo  help      -   shows this help list
echo  i         -   install and upgrades the bot
echo  install   -   install and upgrades the bot
echo  l         -   start the bot in a loop, so it will restart, if it crashes
echo  ls        -   start the bot in a loop, so it will restart, if it crashes
echo  loopstart -   start the bot in a loop, so it will restart, if it crashes
echo  s         -   starts the bot
echo  start     -   starts the bot

goto end

:loopstart
npm start
goto loopstart

:end
