import { useColorThemeContext } from "../contexts/themeContext";

export default function ThemeButton() {
    const { theme, toggle} = useColorThemeContext();

    return <button onClick={toggle}>{theme}</button>
}