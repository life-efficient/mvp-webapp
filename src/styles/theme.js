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
  font-family: var(--font2);
  background-color: var(--color2);
  color: var(--color1);
  padding: 15px;
  cursor: pointer;
  min-width: 150px;
  position: relative;
  transition-duration: 1s;
  text-decoration: none;

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
  // width: 80%;
  width: 400px; 
  // max-width: 400px;
  max-width: 80%;
  border-radius: 3px;
  padding: 20px;
    
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color2);
  color: var(--color1);

  > button {
    background-color: var(--color1);
    color: var(--color2);
  }

  > panel {
    padding: 0px;
  }

  .title {
    font-size: 30px;
    margin-bottom: 20px;
    font-weight: 900;
  }

  > .edit {
    position: absolute;
    height: 25px;
    right: 10px;
    top: 10px;
    cursor: pointer;
}
`