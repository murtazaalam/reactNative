import { StyleSheet } from "react-native";

import * as ColorPallette from './colors'

let Colors = ColorPallette.primaryColors
export const globalStyles = StyleSheet.create({
    shadowStyle: {
        shadowColor: Colors.shadow_color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        // elevation: 5
    }
})