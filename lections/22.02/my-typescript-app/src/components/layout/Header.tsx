import TestNavigate from "../../pages/TestNavigate";
import MyLink from "../MyLink";
import ThemeButton from "../ThemeButton"; 
import { useColorThemeContext } from "../../contexts/themeContext";
import cn from "classnames";

export function Header() {
    const { theme } = useColorThemeContext();

    // classNames('foo', 'bar'); // => 'foo bar'
    // classNames('foo', { bar: true }); // => 'foo bar'
    // classNames({ 'foo-bar': true }); // => 'foo-bar'
    // classNames({ 'foo-bar': false }); // => ''
    // classNames({ foo: true }, { bar: true }); // => 'foo bar'
    // classNames({ foo: true, bar: true }); // => 'foo bar'

    // // lots of arguments of various types
    // classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

    // // other falsy values are just ignored
    // classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'

    const navCN = cn(
        'header',
        theme === 'light' && 'header--light',
        theme === 'dark' && 'header--dark',
    );

    // const navCN = cn(
    //     'header',
    //         'header--light': theme === 'light',
    //         'header--dark': theme === 'dark',
    // );


    return (
        <nav className={navCN}>
          <MyLink url="/">Home |</MyLink>
          <MyLink url="/test">Test |</MyLink>
          <MyLink url="/todos">Todos |</MyLink>
          <MyLink url="/posts">Posts |</MyLink>

          <MyLink url="/todosFilterVariant2">Todos RTK filtered |</MyLink>
          <MyLink url="/dynamic/123/courses/new">Dyn |</MyLink>
          <MyLink url="/external">External |</MyLink>
          <MyLink url="/external/canvas">Canvas |</MyLink>
          <MyLink url="/external/notes">Notes |</MyLink>
          <MyLink url="/external/counter">Counter |</MyLink>
          {/* контекст в name в testNavigate */}
          <TestNavigate />
          <ThemeButton></ThemeButton>
        </nav>
    )

}