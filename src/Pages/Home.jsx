import React from 'react';
import Banner from './Banner';
import Features from './Features';
import Review from './Review';
import FAQ from './FAQ';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            <Review></Review>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;