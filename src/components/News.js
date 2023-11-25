import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country : 'in',
    pagesize : 5
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number
  }

  constructor(){
    super();
    this.state={
      articles : [],
      page : 1,
      loading : false,
      totalResults : 0
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b5192bdbe2d34953b582059f07137847&page=1&category=${this.props.category}&pageSize=${this.props.pageSize}`
    this.setState({loading : true})
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles,
      totalResults : parsedData.totalResults,
      loading:false
    })
  }

  // handleNextClick = async ()=>{
  //   console.log("next clicked")

  //   if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //     let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b5192bdbe2d34953b582059f07137847&page=${this.state.page+1}&category=${this.props.category}&pageSize=${this.props.pageSize}`

  //     this.setState({loading : true})
  //     let data = await fetch(url)
  //     let parsedData = await data.json()
  //     console.log(parsedData)
  
  //     this.setState({
  //       page : this.state.page+1,
  //       articles: parsedData.articles,
  //       loading : false
  //     })
  //   }
  // }

  // handlePrevClick = async ()=>{
  //   console.log("prev clicked")

  //   let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b5192bdbe2d34953b582059f07137847&page=${this.state.page-1}&category=${this.props.category}&pageSize=${this.props.pageSize}`

  //   this.setState({loading : true})
  //   let data = await fetch(url)
  //   let parsedData = await data.json()
  //   console.log(parsedData)

  //   this.setState({
  //     page : this.state.page-1,
  //     articles: parsedData.articles,
  //     loading : false
  //   })

  // }

  fetchMoreData = async() => {
    this.setState({page : this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b5192bdbe2d34953b582059f07137847&page=${this.state.page+1}&category=${this.props.category}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults : parsedData.totalResults,
    })

  };

  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{margin:'35px',marginTop:'90px'}}>NewsVerse - Top {this.props.category} Headlines</h1>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >

        <div className='row'>
        {this.state.articles.map((element)=>{
            return <div className='col-md-4 my-2' key={element.url}>
              <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage?element.urlToImage:"https://www.indiablooms.com/life_pic/2016/news-1471859267.jpg"} newsUrl={element.url} source={element.source.name} publishedAt={element.publishedAt}/>
            </div>
        })}
            
        </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between my-2'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&#8592;prev</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>next&#8594;</button>
        </div> */}
      </div>
    )
  }
}

export default News
