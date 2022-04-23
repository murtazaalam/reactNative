import * as Fonts from './typography';
import * as ColorPallette from './colors'
import { globalStyles } from './styles'
import constant from './constant'
let isLight = false;

let Colors = ColorPallette.primaryColors
if (isLight) {
    Colors = ColorPallette.secondaryColors
}
let GlobalStyle = globalStyles

let Constants = constant

export { Fonts, Colors, GlobalStyle, Constants }
