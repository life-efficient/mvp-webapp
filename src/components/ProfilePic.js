import React, {Component} from "react"
import { css } from "@emotion/core"
/** @jsx jsx */ import { jsx } from '@emotion/core'
import { Storage } from "aws-amplify"

const style = css`
    .display-pic {
        box-shadow: var(--shadow);
        overflow: hidden;
        max-height: 100%;
    }

    .dp-input {
        cursor: pointer;
    }

    .dp-input :hover {
        opacity: 0.5;
    }

    background-color: var(--color2);
    //border: 10px solid var(--color2);
    //border-radius: 50vw;
    height: 50vw;
    width: 50vw;
    max-height: 200px;
    max-width: 200px;
    // width: 200px;
    margin: 30px auto;
    overflow: hidden;

    @media (max-width: 600px) {
        max-height: 100px;
        max-width: 100px;
    }
    img{
        max-width: 100%;
    }
`

class ProfilePic extends Component {

    uploadDP = async (e) => {
        var type
        var url
        var fp
        var file = e.target.files[0]
        type = file.type.split('/')[1]
        //this.props.bucket_filepath = enterprise_users/${uuid.v4()}/profile_pic
        //this.props.bucket_url = https://theaicore-data.s3.eu-west-2.amazonaws.com/public/
        fp = `${this.props.bucket_filepath}.${type}`
        //fp = `enterprise_users/${uuid.v4()}/profile_pic.${type}`
        console.log(fp)
        var mimeType 
        if (type == 'png') {
            mimeType = 'image/png'
        }
        else if (type == 'jpg' || type == 'jpeg') {
            mimeType = 'image/jpeg'
        }
        else {
            alert('image type invalid (use .PNG, .JPG or .JPEG images)\nYou used type ' + type)
            return null
        }
        console.log('puttin')

        var resp = await Storage.put(fp, file, {contentType: mimeType})
        console.log(resp)
        url =`${this.props.bucket_url}${fp}`
        //url =`https://theaicore-data.s3.eu-west-2.amazonaws.com/public/${fp}`
        var update = {img: url}
        this.props.set_dp(update)
        this.props.on_update(update)
        //makePostRequest('app/user/info', update)
    }

    render() {
        return (
            <>
                <div css={style}>
                    <label for="dp-input" className="dp-input">
                        <input onChange={this.uploadDP} id="dp-input" type="file" style={{display: 'none'}} />
                        <img src={this.props.dp_url ? this.props.dp_url : "https://dummyimage.com/400x400/ff822e/fff.png&text=UPLOAD"} className="display-pic" alt=""/>
                        {/*https://dummyimage.com/400x400/ff822e/fff.png&text=UPLOAD+LOGO*/}
                        {/*https://via.placeholder.com/200x200/ff822e/ffffff?text=Upload company logo*/}
                    </label>
                </div>
            </>
        )
    }   
}


export default ProfilePic