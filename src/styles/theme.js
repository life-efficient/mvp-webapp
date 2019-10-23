import { css } from "@emotion/core" 

const theme = {
}

export default theme

export const breakpoints = [576, 768, 992, 1200].map(
  bp => `@media (min-width: ${bp}px)`
)

export const button = css`
    background-color: ${window.theme.color2};
    border: 0;
    box-shadow: var(--shadow);
    border-radius: 3px;
    border: yo;
`

export const core = css`
    a:link {
        text-decoration: none
    }
    a:link { color: black;text-decoration: none; }
a​:visited {  color: black; text-decoration: none;}
a​:hover {  color: black; }
a { color: black;}
`