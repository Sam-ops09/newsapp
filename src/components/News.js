import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }


    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c37a4ca54865495699ecd006ea8a6743&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({
            articles: parsedData.articles, 
            totalArticles: parsedData.totalResults,
            loading: false
        })
    }

    async componentDidMount(){
        this.updateNews()
    }


    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 }, () => {
            this.updateNews();
        });
    }

    handlePreviousClick = async () => {
        this.setState({ page: this.state.page - 1 }, () => {
            this.updateNews();
        });
    }

    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1})
        this.updateNews()
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c37a4ca54865495699ecd006ea8a6743&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles), 
            totalArticles: parsedData.totalResults
        })
    };

    render() {
        return (
            <>
                <h1 className="text-center" style={{margin: '35px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                    <NewsItem title= {element.title?element.title:""} description = {element.description?element.description:""} imageUrl= {element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" onClick={this.handlePreviousClick} className="btn btn-dark"> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News;