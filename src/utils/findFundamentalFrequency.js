const findFundamentalFrequency = (frequencyRangeToDecibelValueMap) => {
	frequencyRangeToDecibelValueMap.sort((a, b) => b[1] - a[1]);

	const frequencyRangeWithLoudestDecibel =
		frequencyRangeToDecibelValueMap[0][0];
	const frequencyWithLoudestDecibel =
		(frequencyRangeWithLoudestDecibel[0] +
			frequencyRangeWithLoudestDecibel[1]) /
		2;

	console.log(
		`Freuquency with loudest decibel: ${frequencyWithLoudestDecibel}`
	);

	return frequencyWithLoudestDecibel;
};

export default findFundamentalFrequency;
