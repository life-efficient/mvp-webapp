import React, {Component} from "react"
import { css } from "@emotion/core"
/** @jsx jsx */ import { jsx } from '@emotion/core'
import { Storage } from "aws-amplify"
import { Button, withTheme } from "@material-ui/core"
import GetAppIcon from '@material-ui/icons/GetApp';

const getStyle = props => {
    switch (props.variant) {
        case "circular":
            return css`

                .title {
                    width: 100%;
                    justify-content: center;
                    display: flex;
                    font-size: 16px;
                    font-weight: 100; // override font-weight: 900; for .panel>.title elements
                }

                .circle {
                    .display-pic {
                        box-shadow: var(--shadow);
                        overflow: hidden;
                        max-height: 100%;
                    }

                    .dp-input {
                        cursor: pointer;
                        height: 100%;
                        width: 100%;
                    }

                    .dp-input :hover {
                        opacity: 0.5;
                    }

                    // background-color: ${props.theme.palette.primary.main};
                    border: 10px solid ${props.theme.palette.primary.main};
                    border-radius: 50vw;
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

                    .placeholder {
                        height: 100%;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            `
        case "row":
        default:
            return css`
                .row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .preview {
                    img {
                        height: 100px;
                        border-radius: 7px;
                    }
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
            `
    }
} 
class UploadPic extends Component {

    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            imgsrc: null//props.default ? props.default:"https://dummyimage.com/400x352/ff822e/fff.png&text=UPLOAD"
        }
    }

    onimgchange = async (e)=>{
        var file = e.target.files[0]
        console.log(file)
        if(this.props.bucket_filepath && this.props.bucket_url){
            var url = await this.uploadDP(file)
            console.log('uploaded success', url)
            this.setState({imgsrc: url})
        }else{
            var reader = new FileReader();
            reader.onload = ()=>{this.setState({imgsrc: event.target.result})}
            reader.readAsDataURL(file);
        }
    }

    componentDidUpdate = (prevProps, prevState)=>{
        console.log('updating')
        if(prevState.imgsrc != this.state.imgsrc){
            if(this.props.id){
                this.props.handleChange({id:this.props.id, value:this.state.imgsrc})
            }else{
                this.props.handleChange(this.state.imgsrc)
            }
        }
    }

    uploadDP = (file) => {
        return new Promise (async (resolve, reject)=>{
            var type
            var url
            var fp
            type = file.type.split('/')[1]
            //this.props.bucket_filepath = enterprise_users/${uuid.v4()}/profile_pic
            //this.props.bucket_url = https://theaicore-data.s3.eu-west-2.amazonaws.com/public/
            fp = `${this.props.bucket_filepath}.${type}`
            //fp = `enterprise_users/${uuid.v4()}/profile_pic.${type}`
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
            console.log('puttin in s3')

            try{
                var resp = await Storage.put(fp, file, {contentType: mimeType})
                console.log(resp)
                url =`${this.props.bucket_url}${fp}`
                //url =`https://theaicore-data.s3.eu-west-2.amazonaws.com/public/${fp}`
                resolve(url)
            }catch(e){
                console.log(e)
                reject()
            }
        })
    }

    render() {
        switch (this.props.variant) {
            case "circular":
                return <div css={[getStyle(this.props), this.props.style]}>
                    <div className="title">
                        {this.props.title}
                    </div>
                    <div className="circle">
                        <label for="dp-input" className="dp-input">
                            <input onChange={this.onimgchange} id="dp-input" type="file" style={{display: 'none'}} />
                            {
                                this.state.imgsrc ?
                                <img src={this.state.imgsrc} className="display-pic" alt=""/>
                                : <div className="placeholder">
                                    {this.props.defaultIcon ? this.props.defaultIcon : <GetAppIcon color="primary" style={{transform: 'rotateZ(180deg)', fontSize: '120px'}}/>}
                                </div>
                            }
                        </label>
                    </div>
                </div>
            case "row":
            default:
                return (
                    <>
                        <div css={[getStyle(this.props), this.props.style]}>
                            <input
                                accept="image/*"
                                id="contained-button-file"
                                multiple={this.props.multiple}
                                type="file"
                                style={{display: 'none'}}
                                onChange={this.onimgchange}
                            />
                            <div className="row">
                                {this.props.title ?<p>{this.props.title}</p>:null }
                                <label htmlFor="contained-button-file">
                                    <Button variant="outlined" color="primary" component="span" endIcon={this.props.icon ? this.props.icon : <GetAppIcon style={{transform: 'rotateZ(180deg)'}}/>}>
                                        Upload
                                    </Button>
                                </label>
                            </div>
                            {
                                this.state.imgsrc ?

                                <div className="preview">
                                    <img src={this.state.imgsrc} alt=""/>
                                </div>
                                : null
                            }
                        </div>
                    </>
                )
        }
    }   
}


export default withTheme(UploadPic)