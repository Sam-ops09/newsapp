import React, { Component } from 'react';

export class NewsItem extends Component {

    render() {
        let {title, description, imageUrl, newsUrl, author, date, source} = this.props
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={!imageUrl? "https://www.usatoday.com/gcdn/-mm-/bdaa868f3fb135fb5b2327024b78c6d1173f6f06/c=0-412-3331-2286/local/-/media/2022/09/27/USATODAY/usatsports/MotleyFool-TMOT-d1a3f19d-8e2dc9d7.jpg?width=3200&height=1801&fit=crop&format=pjpg&auto=webp":imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title} <span className='position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger'>{source} </span></h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {!author? "Unknown": author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;