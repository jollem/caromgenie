# Manual

Here could be throughout instructions with screenshots and everything.
Don't want to bloat the size of the repository with binary assets, so hopefully
the application is straightforward enough to use without those.

One drawback / feature is that UI is language agnostic - all actions are described
by icons instead of text. This might feel confusing at start.

Even though at first application was supposed to be used via touchscreen, it
soon became clear that keyboard support is a must. [Keybingins](src/app/page.tsx#L74-L87) can be seen from
source (action naming is rather poor :see_no_evil: - might get improved in the future).

Note that configuration and theme settings are saved in local storage. Game ID, used for connecting Observer UI
is part of configuration and thus saved across sessions.

## Icons

### Start screen

| Icon                                         | Description                                |
| -------------------------------------------- | ------------------------------------------ |
| ![FaCog](icons/FaCog.svg)                    | Configuration settings                     |
| ![FaCogCheckered](icons/FaFlagCheckered.svg) | Start game (requires at least two players) |

### Configuration view

| Icon                                            | Description                                                                               | Infinity |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- | -------- |
| ![FaCircle](icons/FaCircle.svg)                 | Total innings for the game -> All players have this many attempts                         | true     |
| ![FaCrosshairs](icons/FaCrosshairs.svg)         | Carom target - Game ends if some player has reached carom target at the start of the turn | true     |
| ![FaRegHourglass](icons/FaRegHourglass.svg)     | Shotclock seconds. Set to zero to disable                                                 |
| ![FaStopwatch](icons/FaStopwatch.svg)           | Amount of extensions. Set to zero to disable.                                             |
| ![FaHourglassStart](icons/FaHourglassStart.svg) | Length of extension in seconds                                                            |
| ![FaCheck](icons/FaCheck.svg)                   | Accept configuration and return to start screen                                           |
| ![FaShareAlt](icons/FaShareAlt.svg)             | Get QR code for accessing Observer UI                                                     |

### Game screen

| Icon                                                    | Description                                                                                     |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| ![FaStar](icons/FaStar.svg)                             | Longest carom streak                                                                            |
| ![FaChartLine](icons/FaChartLine.svg)                   | Average caroms e.g. caroms / innings                                                            |
| ![FaPeopleArrows](icons/FaPeopleArrows.svg)             | Swap players e.g. fast way to change player positions after lag (only available when 2 players) |
| ![FaArrowAltCircleLeft](icons/FaArrowAltCircleLeft.svg) | Back to start screen - :warning: Erases game state, no questions asked                          |
| ![FaEraser](icons/FaEraser.svg)                         | Reverts current turn e.g. possible to backtrack game progress in case of accidental turn change |
| ![FaPause](icons/FaPause.svg)                           | Pause game                                                                                      |
| ![FaPlay](icons/FaPlay.svg)                             | Game on                                                                                         |
| ![FaCalculator](icons/FaChartBar.svg)                   | Statistics screen (only available at game over)                                                 |
| ![FaCalculator](icons/FaCalculator.svg)                 | Game screen (only available at statistics screen)                                               |
| ![FaRecycle](icons/FaRecycle.svg)                       | Restart the game with current players & settings (only available at game over)                  |
