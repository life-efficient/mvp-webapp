import { connect } from "react-redux";
import { Auth } from "aws-amplify"

export const makeGetRequest = (endpoint, callback, handleErr=(err)=>{console.log(err)}) => {
    Auth.currentSession()
    .then(
        data => {
            console.log('currentSession:', data)
            var IDToken = data.getIdToken().getJwtToken()
            var options = {
                headers: {
                    "Authorization": IDToken,
                    'Content-Type': 'application/json'
                }
            }
            var url = `https://46zwadhds2.execute-api.eu-west-2.amazonaws.com/prod/${endpoint}`
            console.log('Making request to:', url)
            fetch(url, options)
            .then(
                (data) => {
                    console.log(`Response from ${endpoint}:`)
                    data = data.json()
                    console.log('RESPONSE JSON:', data)
                    return data
                }
            )
            .then(
                data => callback(data)
            )
            .catch(
                err =>  handleErr(err)
            )
        },
        err => {
            console.log(endpoint)
            console.log('AN ERROR OCCURED WHILST GETTING THE SESSION')
            console.log(err)
        }
    )
}

export const makePostRequest = (endpoint, body, callback, handleErr=(err)=>{console.log(err)}) => {
    Auth.currentSession()
    .then(
        data => {
            var IDToken = data.getIdToken().getJwtToken()
            // console.log(IDToken)
            // console.log(JSON.stringify(body))
            var options = {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(body),
                headers: {
                    "Authorization": IDToken,
                    'Content-Type': 'application/json'
                }
            }
            var url = `https://46zwadhds2.execute-api.eu-west-2.amazonaws.com/prod/${endpoint}`
            console.log('Making request to:', url)
            fetch(url , options) 
            .then(
                (data) => {
                    // console.log(`Response from ${endpoint}:`)
                    // console.log('RAW RESPONSE:', data)
                    // console.log('RESPONSE JSON:', data)
                    data = data.json()
                    return data
                }
            )
            .then(
                data => callback(data)
            )
            .catch(
                err =>  handleErr(err)
            )
        }
    )
}

export const postStyle = (style) => {
    console.log('posting style')
    Auth.currentSession()
    .then(
        data => {
            console.log('currentSession:', data)
            var IDToken = data.getIdToken().getJwtToken()
            var options = {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(style),
                headers: {
                    "Authorization": IDToken,
                    'Content-Type': 'application/json'
                }
            }
            fetch('https://ikpilfsw9a.execute-api.eu-west-2.amazonaws.com/prod/post-my-liked-brands', options)
            .then(
                data => {
                    console.log('brands sent')
                }
            )
        },
        err => {
            console.log('AN ERROR OCCURED WHILST GETTING THE SESSION')
            console.log(err)
        }
    )
}

export const getMyRequests = makeGetRequest('get-my-requests', 

)

const mapDispatchToProps = (dispatch) => {
    return {
        notify: (content) => {
            dispatch({
                type: "NOTIFY",
                content
            })
        }
    }
}

// export var makePostRequest = connect(null, mapDispatchToProps)(makePostRequest)