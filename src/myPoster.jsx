import React, { Component } from 'react';
import MyPost from './myPost.jsx';
import $ from 'jquery';
import uuid from 'uuid';

export default class Poster extends Component {
    constructor() {
        super();
        var scrollTriggered = false;
        var disabled = true;
        this.listNum = 18;
        this.articles = null;
        this.state = {
            colume_1: [],
            colume_2: []
        };
        $.getJSON("./posts/myPosts.json", (data) => {
            this.articles = data.articles;
            this.getList();
        });
        $(window).scroll(() => {
            if (disabled === false) {
                if ($(window).scrollTop() + $(window).innerHeight() >= $(document).height() / 1.3 && !scrollTriggered) {
                    scrollTriggered = true;
                    if (this.listNum <= this.articles.length) {
                        this.listNum += 18;
                        scrollTriggered = this.getList();
                    }
                    else {
                        scrollTriggered = false;
                    }
                }
            }
        });
        $(window).on('navOutfits', function () {
            disabled = false;
        });
        $(window).on('navShop', function () {
            disabled = true;
        });
    }

    render() {
        return (
            <div id="myPoster" className="container">
                <div id="myColume1">
                    {this.state.colume_1.map((a, i) => {
                        return (
                            <MyPost key={uuid.v1() } imgUrl={a.imgUrl} jumpUrl={a.jumpUrl} title={a.title} description={a.description}/>
                        );
                    }) }
                </div>
                <div id="myColume2">
                    {this.state.colume_2.map((a, i) => {
                        return (
                            <MyPost key={uuid.v1() } imgUrl={a.imgUrl} jumpUrl={a.jumpUrl} title={a.title} description={a.description}/>
                        );
                    }) }
                </div>
            </div>
        );
    }

    getList() {
        var c1 = [];
        var c2 = [];

        if (this.articles[0]) c1.push(this.articles[0]);
        if (this.articles[1]) c2.push(this.articles[1]);

        for (var i = 2; i < this.listNum; i++) {
            if (this.articles[i]) {
                switch (i % 2) {
                    case 0:
                        c1.push(this.articles[i]);
                        break;
                    case 1:
                        c2.push(this.articles[i]);
                        break;
                }
            }
        }

        this.setState({
            colume_1: c1,
            colume_2: c2
        });

        return false;
    }
}