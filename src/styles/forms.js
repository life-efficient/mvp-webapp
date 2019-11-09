import { css } from "@emotion/core"
import theme from "../styles/theme"

export const Form = css`
    .text-response {
        border: 0;
        border: 1px solid silver;
        border-radius: 3px;
        transition: all 0.3s;
        background-color: white;
        width: 100%;
        box-sizing: border-box;

        font-family: var(--font3);
        font-size: var(--small);
        outline: none;
        resize: none;
        text-align: center;
        overflow: visible;
        margin-bottom: 10px;

        text-align: justify;
        padding: 5px 5px;
        border-radius: ${theme.radius};

        border-radius: 0px;
        border-width: 0 0 2px 0;
        border-color: black;
        background-color: transparent;
    }

    .error {
        font-size: 16px;
        padding-bottom: 10px;
        color: red;
        font-weight: 900;
    }

    .field-title {
        float: left;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active  {
        -webkit-box-shadow: 0 0 0 30px var(--color2) inset !important;
    }

    .detail {
        font-size: 13px;
        padding-bottom: 10px;
        font-weight: 300
    }
  
    .password {
        display: flex;
        img {
            margin-bottom: 10px !important;
            margin-left: 10px !important;
        }

        img {
    --dim: 40px;
    width: var(--dim);
    height: var(--dim);
    min-height:var(--dim);
    min-width: var(--dim);
    margin: auto;
    background-color: transparent;
    display: inline-block;
    vertical-align: center;
    padding: 0;
    cursor: pointer;
        }
    }
`