import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  
  
 
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      urls:[],
    };

   
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  

  componentDidMount() {
    axios.get( "https://desafiourl.herokuapp.com/urls")
      .then(url => {
        const urls = url.data;
        this.setState({ urls:urls });
        })
  }

    delete(url){
    alert('URL foi deletada com sucesso!' + url.nome);
    
    axios.delete('https://desafiourl.herokuapp.com/delete/', { url: { nome: url.nome } });

   // axios.delete('https://desafiourl.herokuapp.com/delete/', {
   //   nome: url.nome
  // }) 

  }

   edit() {
    alert('URL foi editada com sucesso!');
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
   axios.post('https://desafiourl.herokuapp.com/', {
   nome: this.state.value
}) 
   alert('URL foi encurtada com sucesso!');
   this.setState({value:""});
   event.preventDefault();
  }
  
    UrlList(){
      return (     
        
          this.state.urls.map( url =>{
            return (
              <div className="itemlist"  key={url.id.toString()}>
                 <li className="listbox"> 
                     
                      {url.nome}  |  {url.shorturl}   
                       <div className="boxbuttons">
                        <button  onClick={() => { this.edit(url) }}  type="button"  className="btnedit">Editar</button>
                        <button  onClick={() => { this.delete(url) }} type="button" className="btndelete">  X</button>
                       </div>
                        _______________________________________________
                 </li> 
              </div>
              
              )
          })
        
      )
  }


  render() {
    return (    
        <div className="container">
         
         <div className="body">
         <h1 className="textlbl"> Encurtador de URL </h1>
        
          <form onSubmit={this.handleSubmit} className="form">
             <input type="text" value={this.state.value} onChange={this.handleChange}  className="txtinput" placeholder="www.encurteaqui.com"/>
             <input type="submit" value="Encurtar" className="btninput" />
          </form>
          
          <div  className="list" >
              <div>{this.UrlList()}</div>
          </div>
         
          </div>
    
       </div>  
    );
  }

}


export default App;
