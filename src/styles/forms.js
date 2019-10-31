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
        box-shadow: var(--shadow);

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

`