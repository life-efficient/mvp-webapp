
A sidemenu

### props
#### content
- **type**: jsx
- **default**: `null`
- **required**: `false`
- **description**: The content shown on the sidemenu

``` jsx
import React, { Component } from "react";
import { SideMenu, Button  } from "mvp-webapp";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
    return {
        open: () => {dispatch({
            type: "TOGGLE_MENU",
        })}
    }
}

const _C = (props) => {
    return <div><Button text='Click to open side menu' onClick={props.open}/></div>
};

const C = connect(null, mapDispatchToProps)(_C);

<>
<C/>

<SideMenu 
    content={<div>yo</div>}
/>
</>
```
