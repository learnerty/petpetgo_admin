import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
class AllShop extends React.Component{
  constructor(){
    super()
    this.search = this.search.bind(this)
  }
  componentWillMount(){
    axios.get('http://petapi.haoduoshipin.com/shops')
      .then(res => this.props.dispatch({type:'ALLSHOP',allshop:res.data.shops}))
  }
  search(){
    let val = {key:this.input.value}
    axios.post('http://petapi.haoduoshipin.com/shop/search',val)
      .then(res => this.props.dispatch({type:'ALLSHOP',allshop:res.data.shops}))
  }
  render(){
    console.log(this.props.allshop);
    let divSty = {
      width:'200px',
      height:'200px',
      float:'left',
      margin:'20px',
      background:'rgba(204,204,204,0.4)',
      textAlign:'center'
    }
    return (
      <div>
        <div className="clearfix">
          <h1 style={{float:'left'}}>所有店铺</h1>
          <div style={{float:'right'}}><input ref={input => this.input=input} onChange={this.search}/><button onClick={this.search}>搜索</button></div>
        </div>
        {
          this.props.allshop.length ?
          <div className="clearfix">
            {
              this.props.allshop.map(item => {
                return (
                  <div key={item._id} style={divSty}>
                    <h3 style={{margin:'10px 0'}}>{item.name}</h3>
                  </div>
                )
              })
            }
          </div> :
          <div style={{position:'absolute',top:'50%',left:'50%',width:'200px',textAlign:'center',marginLeft:'-100px'}}><h2>抱歉，暂无店铺信息</h2></div>
        }
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  allshop:state.allShop
})
export default connect(mapStateToProps)(AllShop)
