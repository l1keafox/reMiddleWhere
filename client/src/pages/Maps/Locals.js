import React,{ useEffect,useState } from 'react'
import {  QUERY_LOCALES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
function Locals(props) {
    
    let { loading, data,refetch } = useQuery(QUERY_LOCALES, {
        variables: { latitude: props.center.lat , longitude:props.center.lng },
    });
    let [locals, setLocals] = useState([]);

    console.log(props.center.lat,props.center.lng ,"getting?");
    useEffect(() => {
        if(data){
             console.log("DATA",data.getLocalPlaces.results.length);   
             data.getLocalPlaces.results.forEach(element => {
                console.log(element.name);
                setLocals(locals=>[...locals,element.name]);
                console.log(locals);
             });
             
            }

            console.log(locals);
      }, [data]);

  return (
    <div>
        <h1>Locals</h1>
        {locals.map(element => {
            <h2> {element.name }</h2>
        })}
    </div>
  )
}

export default Locals