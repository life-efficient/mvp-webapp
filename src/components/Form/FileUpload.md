An upload file input designed for images. Displays the uploaded image and can upload to s3

### props

#### handleChange
- **type**: function
- **default**: `null`
- **required**: `false`
- **description**: Callback function for image uploaded

#### default
- **type**: string
- **default**: `null`
- **required**: `false`
- **description**: the default src value for the image

#### bucket_filepath
- **type**: `string`
- **default**: `null`
- **required**: `false`
- **description**: The path to the file within the s3 bucket

#### bucket_url
- **type**: `string`
- **default**: `null`
- **required**: `false`
- **description**: The url to the bucket

#### preview
- **type**: `boolean`
- **default**: `false`
- **required**: `false`
- **description**: Determines whether you want to have a preview of the file once uploaded
``` jsx
import { FileUpload } from "mvp-webapp";

<FileUpload  
        type='image'
        variant="circular"
        id="inputpicc"
        label='Company Logo'
        color='primary'
        //bucket_filepath="public/test/profile_pic"
        //bucket_url="https://theaicore-data.s3.eu-west-2.amazonaws.com/"
        handleChange={(remote_url)=>{
            console.log('just updated dat image')
            console.log(remote_url)
        }}
></FileUpload>
```
