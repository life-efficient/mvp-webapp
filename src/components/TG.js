import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete'; //grid 
import Fab from '@material-ui/core/Fab'; //grid
import AddIcon from '@material-ui/icons/Add'; //grid 
import {withTheme} from '@material-ui/core';
import { css, jsx } from '@emotion/core';

const grid_container_style = css`
width: 100%;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: flex-start;
flex-wrap:wrap;
`
const get_grid_style = (props)=>{
  return css`
  background: white;
  //color: black;
  color: ${props.theme.palette.secondary.main};
  flex:1;
  margin:${props.size?props.size/11:5}px;
  min-width:${props.size?props.size:54}px;
  max-width:${props.size?props.size:54}px;
  min-height:${props.size?props.size:54}px;
  border-radius:2px;
  position:relative;
  display: flex;
  flex-direction:column;
  align-items:center;
  >svg{
    width: ${props.size?props.size/1.5:36}px;
    height: ${props.size?props.size/1.5:36}px;
    color: ${props.theme.palette.primary.main};
  }
  .greyed{
    background:grey;
    opacity:0.5;
    z-index:2
  }
  .tileoverlay{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:3;
    display: flex;
    justify-content: center;
    align-items:center;
    .deletebtn{
      background-color: #ff3333;
      width: ${props.size?props.size/2:27}px;
      height: ${props.size?props.size/2:27}px;
    }
  }
  .addbtn{
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    svg{
      color:#1a1a1a;
      width: ${props.size?props.size/1.1:54}px;
      height: ${props.size?props.size/1.1:54}px;
    }
    svg:hover{
      color:green;
      cursor:pointer;
    }
  }
  `
}

const Tile = withTheme((props)=>{
  const [hover, toggleHover] = useState(false);
  switch(props.type){
    case "add":
        return <div 
        css={[get_grid_style(props)]}
        onMouseLeave={(e) => {toggleHover(false);}}
        onMouseOver={(e) => {toggleHover(true);}}>
          <div className="addbtn">
            <AddIcon className="addbtn" onClick={props.add_fn}/>
          </div>
        </div>
    default:
      return <div 
      css={[get_grid_style(props)]}
      onMouseOver={(e) => {toggleHover(true);}}
      onMouseLeave={(e) => {toggleHover(false);}}>
        {hover && props.delete_fn ? <div className="tileoverlay greyed"></div>:null}
        {hover && props.delete_fn? <div className="tileoverlay">
          <Fab color="primary" aria-label="delete" className="deletebtn" onClick={props.delete_fn}><DeleteIcon /></Fab>
        </div>:null}
        {props.icon}
        {props.title}
      </div>
  }
})
const TG = withTheme((props)=>{
  return <div css={[grid_container_style]}>
    {props.tiles.map((tile)=>{
      return <Tile size={props.size?props.size:null} {...tile}/>
    })}
  </div>
})

export default TG