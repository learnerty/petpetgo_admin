import React from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
class Addwares extends React.Component{
  state = {
    commodity:[],
    title:''
  }
  componentWillMount(){
    axios.get(`http://petapi.haoduoshipin.com/cat/${this.props.match.params.id}/products`)
      .then(res => this.setState({commodity:res.data.products}))
    let title = this.props.history.location.title
    let petadnav = JSON.parse(sessionStorage.petadnav).slice(0,2)
    if(title){
      sessionStorage.addwares = JSON.stringify(title)
      sessionStorage.petadnav = JSON.stringify([...petadnav,{title:title,path:this.props.location.pathname}])
    }
    if(sessionStorage.addwares){
      this.setState({title:JSON.parse(sessionStorage.addwares)})
    }
    this.props.dispatch({type:'NAVLIST',navlist:JSON.parse(sessionStorage.petadnav)})
  }
  handleSubmit(e){
    e.preventDefault()
    let newWares = {name:this.addwaresname.value,price:this.addwaresprice.value,poster:this.addwaresimg.value,cat:this.props.match.params.id}
    if(newWares.name&&newWares.price&&newWares.poster){
      axios.post('http://petapi.haoduoshipin.com/product',newWares)
        .then(res => {
          this.form.reset()
          this.setState({commodity:[...this.state.commodity,res.data.products]})
        })
        .catch(err => console.log(err))
    }else{
      alert('请正确输入表单内容')
    }
  }
  render(){
    return (
      <div>
        <div>
          <h3>添加商品</h3>
          <div className="formdiv">
            <form onSubmit={this.handleSubmit.bind(this)} ref={form => this.form=form}>
              <div>
                <label>商品名称:</label><input placeholder="请输入商品名称" ref={input => this.addwaresname = input}/>
                <label>价格:</label><input type="number" placeholder="请输入商品名称" ref={input => this.addwaresprice = input}/>
                <label>商品图片:</label><input placeholder="请输入图片网址" ref={input => this.addwaresimg = input}/>
              </div>
              <div className="btns clearfix">
                <button type="submit">添加</button>
                <button type="reset">清空</button>
              </div>
            </form>
          </div>
        </div>
        <div className="catwares clearfix">
          <h3>{this.state.title ? this.state.title : null}</h3>
          {
            this.state.commodity.map(item => {
              return <div key={item._id}>
                <p>{item.name}</p>
                <div className="clearfix">{item.poster? <img src={item.poster} alt="img"/> : null}</div>
              </div>
            })
          }
        </div>
      </div>
    )
  }
}
export default withRouter(connect(null)(Addwares))
