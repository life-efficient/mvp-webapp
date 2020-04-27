An uploadable image icon which uploads to s3

### props
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

#### on_update
- **type**: function
- **default**: `null`
- **required**: `false`
- **description**: Callback function if image is updated

``` jsx
import logo from '../images/external/logo.png';
import { ProfilePic } from "mvp-webapp";

<ProfilePic bucket_filepath={`enterprise_users/test/profile_pic`}
            bucket_url = "https://theaicore-data.s3.eu-west-2.amazonaws.com/public/"
            dp_url = {null}
            on_update = {(update)=>{
                //
            }
            }
></ProfilePic>
```
