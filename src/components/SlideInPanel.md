A panel that slides in from some direction

``` jsx
import SlideInPanel from "./SlideInPanel";
import myButton from "./Button";
import { connect, dispatch } from "react-redux";

const _Button = (props) => {
    return <button text='Make panel slide in' onClick={()=>{props.openSlideIn(<div>yoo</div>)}}> press me </button>
}

const mapDispatchToProps = (dispatch) => {
    return {
        openSlideIn: (content) => {
            dispatch({
                type: "OPEN_SLIDEUP",
                content
            })
        }
    }
}

var Button = connect(null, mapDispatchToProps)(_Button);


<>
<Button text='fake'/>
<SlideInPanel />
</>
```