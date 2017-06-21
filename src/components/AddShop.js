import React from 'react';
import '../css/addshop.css'
import axios from 'axios'
import { connect } from 'react-redux'
class AddShop extends React.Component{
  componentWillMount(){
    sessionStorage.petadnav = JSON.stringify([{title:'添加店铺',path:this.props.location.pathname}])
    this.props.dispatch({type:'NAVLIST',navlist:JSON.parse(sessionStorage.petadnav)})
  }
  handleSubmit(e){
    e.preventDefault()
    let newShop = {name:this.addshopname.value,poster:this.addshopimg.value,desc:'desc the shop'}
    if(newShop.name&&newShop.poster){
      axios.post('http://petapi.haoduoshipin.com/shop',newShop)
        .then(res => this.form.reset())
        .catch(err => console.log(err))
    }else{
      alert('店铺名或图片不能为空')
    }
  }
  render(){
    return (
      <div>
        <h1>添加店铺信息</h1>
        <div className="formdiv">
          <form onSubmit={this.handleSubmit.bind(this)} ref={form => this.form=form}>
            <div>
              <label>店铺名:</label><input placeholder="请输入店铺名称" ref={input => this.addshopname = input}/>
              <label>店铺图片:</label><input placeholder="请输入图片网址" ref={input => this.addshopimg = input}/>
            </div>
            <div className="btns clearfix">
              <button type="submit">添加</button>
              <button type="reset">清空</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default connect(null)(AddShop)
