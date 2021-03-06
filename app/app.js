import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import NewsList from './NewsList.js';
import './app.css';
function get(url) {
    return Promise.resolve($.ajax(url));
}

get('https://hacker-news.firebaseio.com/v0/topstories.json').then(function (stories) {
    console.log(stories);
    return Promise.all(stories.slice(0,30).map(itemId => get('https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json')));
}).then(function (items) {
    render(<NewsList items={items}/>,$("#container")[0]);
})
