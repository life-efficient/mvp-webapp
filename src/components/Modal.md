A modal. 

Content is updated any time the modal is opened. Content is wiped when the modal closes.

### props
#### no_click_off: If true, then you cannot click off the backdrop
#### content
- **type**: jsx
- **default**: `null`
- **required**: `false`
- **description**: The jsx that is rendered on the modal

``` jsx
import { Button as _Button } from "@material-ui/core";
import { Form } from "mvp-webapp";
import { connect } from "react-redux";

// to connect a button to the global state (redux), you should make a component like this
const mapStateToProps = (state) => {
    return {
        isOpen: state.modal.open,
        content: state.modal.content,
        no_click_off: state.modal.no_click_off
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        close: () => {
            dispatch({type: "CLOSE_MODAL"})
        },
        onClick: () => dispatch({
            type: "OPEN_MODAL",
            content: <Form slides={[{title: 'Congrats', questions: [{type: 'text', id: 'demo', title: 'Nice'}],}]}/>,
            no_click_off: true
        })
    }
}
const Button = connect(mapStateToProps, mapDispatchToProps)(_Button);

<Button>Click for modal</Button>

```