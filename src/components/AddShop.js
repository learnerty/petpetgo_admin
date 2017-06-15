import React from 'react';
import '../css/addshop.css'
import axios from 'axios'
class AddShop extends React.Component{
  handleSubmit(e){
    e.preventDefault()
    let newShop = {name:this.addshopname.value}
    if(newShop.name){
      axios.post('http://petapi.haoduoshipin.com/shop/new',newShop)
        .then(res => this.form.reset())
    }else{
      alert('店铺名不能为空')
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
export default AddShop
