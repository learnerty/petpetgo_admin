import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import '../css/addCats.css'
import { Link } from 'react-router-dom'
class AddCats extends React.Component{
  constructor(){
    super()
    this.addCat = this.addCat.bind(this)
  }
  componentWillMount(){
    axios.get(`http://petapi.haoduoshipin.com/shop/${this.props.match.params.id}/cats`)
      .then(res => this.props.dispatch({type:'GETCATS',getCats:res.data.cats}))
    let title = this.props.history.location.title
    let petadnav = JSON.parse(sessionStorage.petadnav).slice(0,1)
    if(title){
      sessionStorage.petadnav = JSON.stringify([...petadnav,{title:title,path:this.props.location.pathname}])
    }
    this.props.dispatch({type:'NAVLIST',navlist:JSON.parse(sessionStorage.petadnav)})
  }
  addCat(e){
    e.preventDefault()
    let addCat = {
      name:this.addCatInput.value.trim(),
      shop:this.props.match.params.id
    }
    if(addCat.name){
      axios.post('http://petapi.haoduoshipin.com/cat',addCat)
        .then(res => {
          this.props.dispatch({type:'ADDCAT',addCat:res.data.category})
          this.addCatInput.value = ''
        })
    }else{
      alert('输入值不能为空')
    }

  }
  render(){
    console.log(this.props.Cats);
    return (
      <div>
        <div>
          <h3>添加分类</h3>
          <form>
            <input placeholder="请输入分类名称" ref={input => this.addCatInput = input}/>
            <button type="submit" onClick={this.addCat}>添加</button>
          </form>
        </div>
        <div className="allcats clearfix">
          <h3>所有分类</h3>
          {
            this.props.Cats.map(item => {
              return <div key={item._id}>
                <Link to={{pathname:`/addwares/${item._id}`,title:item.name}}>{item.name}</Link>
              </div>
            })
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  Cats:state.Cats
})
export default connect(mapStateToProps)(AddCats)
