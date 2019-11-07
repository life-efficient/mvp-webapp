import { css } from "@emotion/core" 

const theme = {
}

export default theme

export const breakpoints = [576, 768, 992, 1200].map(
  bp => `@media (min-width: ${bp}px)`
)

export const button = css`
  border: 0;
  box-shadow: var(--shadow);
  border-radius: 3px;
  border: yo;
  background-color: var(--color2);
  background-color: $primar;
  font-family: var(--font2);
  color: var(--color1);
  padding: 15px;
  cursor: pointer;
  min-width: 150px;
  position: relative;
  // min-height: 45px;
  transition-duration: 1s;

  :focus {
    outline: 0;
  }

  :active {
    transform: scale(0.9)
  }
`

export const core = css`
  a:link {text-decoration: none}
  a:link { color: var(--textColor); text-decoration: none; }
  a​:visited {  color: var(--textColor); text-decoration: none;}
  a​:hover {  color: var(--textColor); }
  a { color: var(--textColor);}
`

export const panel = css`
  font-family: var(--font1);
  width: 100%;
  background: linear-gradient(var(--secondary), var(--secondary_grad));
  margin: 20px auto;
  width: 80vw;
  max-width: 400px;
  border-radius: 3px;
  padding: 20px;
    
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color2);
`