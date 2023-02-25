const findFundamentalFrequency = (frequencies_map) => {
	frequencies_map.sort((a, b) => b[1] - a[1]);

	let loudest_frequency_decibel = frequencies_map[0][1];

	for (let index = 1; index < frequencies_map.length; index++) {
		if (frequencies_map[index][1] < loudest_frequency_decibel - 30) {
			frequencies_map.splice(index, 1);
			index--;
		}
	}

	frequencies_map.sort((a, b) => b[0] - a[0]);
	let index_of_loudest_frequency = null;

	for (let index = 0; index < frequencies_map.length; index++) {
		if (frequencies_map[index][1] == loudest_frequency_decibel) {
			index_of_loudest_frequency = index;
			break;
		}
	}

	frequencies_map = frequencies_map.slice(index_of_loudest_frequency);

	for (let index = 1; index < frequencies_map.length; index++) {
		if (
			frequencies_map[0][0] % frequencies_map[index][0] <= 2 &&
			frequencies_map[0][0] % frequencies_map[index][0] >= 0
		) {
			frequencies_map = frequencies_map.slice(index);
			index = 1;
		}
	}

	return frequencies_map[0][0];
};

export default findFundamentalFrequency;
