import { css } from "@emotion/core"

export default (props) => {
    const style = css`
        width: 100%;
        min-height: 500px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow-x: hidden;
        // padding: 0 10px; 
        box-sizing: border-box;
        position: sticky;
        position: -webkit-sticky;
        background-color: ${props.color ? props.color : 'var(--color2)'};
        background: ${props.color ? props.color : 'linear-gradient(var(--color2), var(--color2g))'};
        font-family: var(--font1);
        align-items: center;
    `

    switch (props.op) {
        case 'sass':
            return (
                'YO'
            )
        default:
            return (
                <div css={style}>
                    {props.inner}
                </div>
            )
    }
}