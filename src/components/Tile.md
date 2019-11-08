A tile

``` jsx
import logo from '../images/external/logo.png';
import { Tile } from "mvp-webapp";

[
    {
        title: 'tile 1',
        icon: logo
    }
    ,
    {
        title: 'tile 2',
        icon: logo
    }
]
.map((t) => { return (<Tile {...t} />) })
```
