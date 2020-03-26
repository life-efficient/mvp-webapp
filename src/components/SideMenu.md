
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

class _MyComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: 'some content'
        }
    }

    // toggleContent = () => {
    //     console.log(this.state.content)
    //     return this.state.content == 'some content' ? 'other content' : 'some content'
    // }

    render() {return (
            <>
                <Button 
                    text='Click to open side menu' 
                    onClick={
                        ()=>{this.props.open(this.state.content)}
                    }
                />
                <div>Current content {this.state.content}</div>
                <Button text='toggle content' onClick={
                    () => {
                        console.log(this.state.content)
                        this.setState({content: this.state.content == 'some content' ? 'other content' : 'some content'})
                    }
                }/>
            </>
    )}
};

const mapDispatchToProps = (dispatch) => {
    return {
        open: (content) => {dispatch({
            type: "TOGGLE_MENU",
            content
        })}
    }
};

const MyComponent = connect(null, mapDispatchToProps)(_MyComponent);

<>
<MyComponent/>
<SideMenu />
</>
```
