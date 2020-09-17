import  React from "react"
import {Component}from 'react';
import { Form, FormGroup, FormControl, Button, Container, Row, Col } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

    
function getimg() {
  var number = Math.floor(Math.random() * 5) + 1;
  console.log("Number " + number)
  return(number);
}

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      img_path: "",
      img_annotate: "",
      number : getimg()
    }
  }
  
  componentDidMount() {
    if(window.sessionStorage.getItem(this.state.number)){
      window.alert("Repeated")
      window.location.reload()
    }
  }

  componentWillUnmount() {
    window.location.reload()
  }



  skipimg = () => {
    console.log("skipimg")
    if(window.sessionStorage.getItem(this.state.number)){
      window.alert("Repeated")
      window.location.reload()
    }
    else{
      window.sessionStorage.setItem(this.state.number,this.state.number)
      window.location.reload()
    }
    
  }

  submitimg = () => {
    console.log("submitimg")
    console.log(this.state.img_annotate)
    if(!window.sessionStorage.getItem(this.state.number)){
      window.sessionStorage.setItem(this.state.number,this.state.number)
      const newImg = {
        img_path: "./img/img_" + this.state.number + ".jpg",
        img_annotate: this.state.img_annotate,
    };

    axios.post('http://localhost:4000/img/add', newImg)
        .then(res => console.log(res.data));

    this.setState({
        img_path: '',
        img_annotate: '',
    })
      window.alert("Submitted")
      window.location.reload()
    }
  }

  imgname = (e) => {
    var name = e.target.value;
    this.setState({img_annotate:name})
    console.log(name)
  }


  render() {
    const {number,img_annotate} = this.state;

    return (
      <>
      <div className="div-center">
        <Container fluid>
          <Form>
            <FormGroup>
              <Row>
                <Col>
                <h2>Web Annotation Tool</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                <h5>Annotate the Image</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                <Image src={require(`./img/img_${number}.jpg`)} fluid className="img-spacing"></Image>
                </Col>
              </Row>
              <Row>
                <Col>
                <FormControl type="text" placeholder="What do you see? Please Enter" className="control-spacing" autoFocus onChange={this.imgname} value={img_annotate} />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
            <Row>
                <Col>
                  <Button variant="primary" size="lg" onClick={this.submitimg}>Submit</Button>
                </Col>
                <Col>
                  <Button variant="primary" size="lg" onClick={this.skipimg}>Skip</Button>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Container>
      </div>
      </> 
    );
  }

  

}

export default App;
