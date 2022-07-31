import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardGroup, Alert } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import AceEditor from "react-ace";
// import mode-<language> , this imports the style and colors for the selected language.
import "ace-builds/src-noconflict/mode-python";
// there are many themes to import, I liked monokai.
import "ace-builds/src-noconflict/theme-monokai";
// this is an optional import just improved the interaction.
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import MainScreen from "../../components/MainScreen";

import Correction from '../../components/Correction';
//import { Button } from "bootstrap"
//import fs from"fs";






export const Probleme = ({ match }) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [code, setCode] = useState();
  const [nbrtest, setNbrtest] = useState();
  const [reponse, setReponse] = useState({});

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get("http://localhost:5000" + `/api/problemes/${match.params.id}`);
      //const { a } =  await axios.get(`/api/problemes/create`);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setNbrtest(data.nbrtest);

    };

    fetching();
  }, []);

  //axios.get("/api/problemes/download").then(res=>{
  // console.log(res)
  //})
  let result = [];
  const id = match.params.id;


  const send = async () => {
    // setCode("hello");
    console.log("nbr", nbrtest)
    console.log("id", id);
    console.log(code);
    console.log(title);


    const x = await axios.post("http://localhost:5000/api/problemes/download", { code, title, id, nbrtest })
    console.log("ssssssssss", x)

    setReponse(x.data);
    result = x.data
    console.log("result", result);
    console.log("reponse", reponse);
    console.log("object", Object.values(result))

  };
  console.log("rrrrrrrr", reponse)

  return (
    <MainScreen title="Consult The Probleme">
      <div>
        <CardGroup>
          <Card>
            <Card.Body>
              <AceEditor
                placeholder="Start Coding"
                mode="python"
                theme="monokai"
                name="basic-code-editor"
                onChange={(currentCode) => setCode(currentCode)}
                fontSize={20}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={code}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 4,
                }}
              /><div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px 32px",
                  fontsize: " 16px",
                  margin: "4px 2px",
                }}
              >

                <button style={{ color: "white", background: "blue" }} onClick={send}   >

                  SUBMIT
                </button>

                <br />


              </div>

            </Card.Body>
          </Card>


          <Card>
            <Card.Body>
              <Card.Title>
                <h1
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: 'red'
                  }}
                  
                >
                  {title}
                </h1>
              </Card.Title>

              <br />
              <div style={{ width: "500rem" ,
            color:"blue",
            fontWeight: 'bold',
     fontStyle: 'italic',
    textDecorationLine: 'underline',}}>content</div>

              <ReactMarkdown>{content}</ReactMarkdown>

              <h3
                style={{
                  position: "absolute",
                  bottom: "8px",
                  left: "16px",
                  fontsize: "18px",
                  justifyContent: "center",
                  color:"red",
                }}
              >
                 {category}
              </h3>
            </Card.Body>
          </Card>
        </CardGroup>

        {

          reponse && Object.keys(reponse).map((key, index) => 
      
              <Correction key={index} index={index} test={reponse[key]}> </Correction>
      
          )
        }


        {/* {[
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
          'light',
          'dark',
        ].map((variant) => (
          <Alert key={variant} variant={variant}>
            This is a {variant} alert—check it out!{result}
          </Alert>

        ))} */}



      </div>
    </MainScreen>

  );
};