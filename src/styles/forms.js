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
        color: white;

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

    > .form {
        padding: 0px;
    }
    
    > button {
        background-color: var(--color1);
        color: var(--color2);
    }

    select {
        // width: 10px;
        // display: none;
        background-color: var(--color2);
        padding: 8px;
        font-size: inherit;
        font-family: inherit;
        border-radius: var(--radius);
        border: 2px solid black;
        margin-bottom: 10px;
        margin-left: -80px;

        option {
            background-color: var(--color2);
        }

            .select-selected {
                background-color: red;
            }

            /* Style the arrow inside the select element: */
            .select-selected:after {
                position: absolute;
                content: "";
                top: 14px;
                right: 10px;
                width: 0;
                height: 0;
                border: 6px solid transparent;
                border-color: #fff transparent transparent transparent;
            }

            /* Point the arrow upwards when the select box is open (active): */
            .select-selected.select-arrow-active:after {
                border-color: transparent transparent #fff transparent;
                top: 7px;
            }

            /* style the items (options), including the selected item: */
            .select-items div, .select-selected {
                color: #ffffff;
                padding: 8px 16px;
                border: 1px solid transparent;
                border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
                cursor: pointer;
            }

            /* Style items (options): */
            .select-items {
                position: absolute;
                background-color: DodgerBlue;
                top: 100%;
                left: 0;
                right: 0;
                z-index: 99;
            }

            /* Hide the items when the select box is closed: */
                .select-hide {
                display: none;
            }

            .select-items div:hover, .same-as-selected {
                background-color: rgba(0, 0, 0, 0.1);
            }
    }
`