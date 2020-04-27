A listing

### props
#### title
- **type**: `string`
- **default**: `null`
- **required**: `false`
- **description**: The title shown on the tile

#### subheading
- **type**: `string`
- **default**: `null`
- **required**: `false`
- **description**: Subheading to display under title

#### description
- **type**: `string`
- **default**: `null`
- **required**: `false`
- **description**: Main body of text on the listing.

#### img
- **type**: src for img tag
- **default**: `null`
- **required**: `false`
- **description**: Image to display on listing

#### edit_fn
- **type**: function
- **default**: `null`
- **required**: `false`
- **description**: Adds an edit button to the listing and executes this function on click

#### delete_fn
- **type**: function
- **default**: `null`
- **required**: `false`
- **description**: Adds a delete button to the listing and executes this function on click

#### onClick
- **type**: function
- **default**: `null`
- **required**: `false`
- **description**: Function to execute when listing is clicked

#### type
- **type**: `string`
- **default**: `null`
- **required**: `false`
- **description**: Used to create different listing types

``` jsx
import logo from '../images/external/logo.png';
import { Listing } from "mvp-webapp";

[
    {
        title: "Listing title",
        img: logo,
        description: "This is the description text for this listing.",
        edit_fn: ()=>{},
        delete_fn: ()=>{},
    },
    {
        type: "add",
        onClick: ()=>{},
    }
].map((p)=>{return <Listing {...p}/>})
```
