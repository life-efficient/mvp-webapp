import React from "react"
import { css } from "@emotion/core"

const Footer = () => {
    return (
        <div css={css`background-color: black; height: 8vh; display: flex; justify-content: space-between;`}>
            <div>
                Contact
            </div>
            <div>
                Address
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        address: state.app.address,
        contact: state.app.address
    }
}

export default Footer = connect(mapStateToProps)(Footer)