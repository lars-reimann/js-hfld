import types from "./types.js";

export default {
    [types.OPEN_FILE]:                      () => "OPEN_FILE",
    [types.SAVE]:                           () => "SAVE",
    [types.CLOSE]:                          () => "CLOSE",
    [types.SOURCE_VIEW]:                    () => "SOURCE_VIEW",
    [types.TABLE_VIEW]:                     () => "TABLE_VIEW",
    [types.GRAPHICAL_VIEW]:                 () => "GRAPHICAL_VIEW",
    [types.TOGGLE_PERMANENT_MENUBAR]:       () => "TOGGLE_PERMANENT_MENUBAR",
    [types.TOGGLE_PERMANENT_LEFT_SIDEBAR]:  () => "TOGGLE_PERMANENT_LEFT_SIDEBAR",
    [types.TOGGLE_PERMANENT_RIGHT_SIDEBAR]: () => "TOGGLE_PERMANENT_RIGHT_SIDEBAR"
};