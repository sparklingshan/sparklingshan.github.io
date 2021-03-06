import React, { Component } from 'react';
import MyPost from './myPost.jsx';
import $ from 'jquery';
import uuid from 'uuid';

export default class Poster extends Component {
    constructor() {
        super();
        this.scrollTriggered = false;
        this.listNum = 18;
        this.articles = null;
        this.state = {
            colume_1: [],
            colume_2: [],
            colume_3: []
        }
        $.getJSON("./posts/myPosts.json", (data) => {
            this.articles = data.articles;
            this.getList();
        });
        $(window).on('updateMyPoster', () => {
            this.scrollTriggered = true;
            if (this.listNum <= this.articles.length) {
                this.listNum += 18;
                this.scrollTriggered = this.getList();
            }
            else {
                this.scrollTriggered = false;
            }
        });
    }
    componentDidMount() {
        $(window).scroll(this.scroll);
    }
    componentWillUnmount() {
        $(window).off('scroll', this.scroll);
    }
    render() {
        return (
            <div id="myPoster" className="container">
                <div className="colume1">
                    {this.state.colume_1.map((a, i) => {
                        return (
                            <MyPost key={uuid.v1() } imgUrl={a.imgUrl} jumpUrl={a.jumpUrl} title={a.title} description={a.description} links={a.links}/>
                        );
                    }) }
                </div>
                <div className="colume2">
                    {this.state.colume_2.map((a, i) => {
                        return (
                            <MyPost key={uuid.v1() } imgUrl={a.imgUrl} jumpUrl={a.jumpUrl} title={a.title} description={a.description} links={a.links}  />
                        );
                    }) }
                </div>
                <div className="colume3">
                    {this.state.colume_3.map((a, i) => {
                        return (
                            <MyPost key={uuid.v1() } imgUrl={a.imgUrl} jumpUrl={a.jumpUrl} title={a.title} description={a.description} links={a.links}/>
                        );
                    }) }
                </div>
            </div>
        );
    }
    getList() {
        var c1 = [];
        var c2 = [];
        var c3 = [];

        if (this.articles[0]) c1.push(this.articles[0]);
        if (this.articles[1]) c2.push(this.articles[1]);
        if (this.articles[2]) c3.push(this.articles[2]);

        for (var i = 3; i < this.listNum; i++) {
            if (this.articles[i]) {
                switch (i % 3) {
                    case 0:
                        c1.push(this.articles[i]);
                        break;
                    case 1:
                        c2.push(this.articles[i]);
                        break;
                    case 2:
                        c3.push(this.articles[i]);
                        break;
                }
            }
        }

        this.setState({
            colume_1: c1,
            colume_2: c2,
            colume_3: c3
        });

        return false;
    }
    scroll() {
        if ($(window).scrollTop() + $(window).innerHeight() >= $(document).height() / 1.3 && !this.scrollTriggered) {
            $(window).trigger('updateMyPoster');
        }
    }
}