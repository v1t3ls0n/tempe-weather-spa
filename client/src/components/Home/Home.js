import React from 'react';
import SearchField from './SearchField';
// import PropTypes from 'prop-types';

const Home = ({theme}) => {
	return (
		<main id='home' className={theme}>
			<SearchField theme={theme} />
		</main>
	);
};

// Home.propTypes = {};

export default Home;
