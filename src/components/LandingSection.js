import { css } from "@emotion/core"

export default (props) => {
    const style = css`
        width: 100%;
        min-height: 85vh;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow-x: hidden;
        padding: 0 40px; 
        text-align: center;
        box-sizing: border-box;
        position: sticky;
        position: -webkit-sticky;
        background: ${props.idx ?
                        props.idx % 2 == 0 ? 'transparent' : 'linear-gradient(var(--color2), var(--color2g))'
                        :
                        'transparent'
                    };
        font-family: var(--font1);
        align-items: center;
        > div, button {
            margin-top: 30px;
        }

        .hero-img {
            position: absolute;
            padding: 0;
            min-height: 100%;
            min-width: 100%;
            background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url("../images/hero.jpg");

            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            z-index: -1;
        }
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