// import { ArrayUtils } from "../Main"
// import { requireCheck, test } from "./Contract"

// export let between = (value, start, end) => {
// 	return value >= start && value <= end
// }

export let getRandomFloat = (start, end) => {
	return (end - start) * Math.random() + start
}

// export let getRandomInteger = (start, end) => {
// 	return Math.round((end - start) * Math.random()) + start
// }
export let getRandomInteger = (start, end) => {
	// Use floor instead of round to ensure equal probability distribution
	return Math.floor(Math.random() * (end - start + 1)) + start
}


export let randomSelect = (arr) => {
	return arr[getRandomInteger(0, arr.length - 1)]
}

// // export let randomSelectCount = (arr, count) => {
// // 	if (arr.length < count) {
// // 		// throw new Error("err")
// // 		return arr
// // 	}

// // 	// let length = arr.length

// // 	// let selectedKeys = []
// // 	// let result = []
// // 	// while (selectedKeys.length < count) {
// // 	// 	let key = getRandomInteger(0, length - 1)

// // 	// 	if (selectedKeys.includes(key)) {
// // 	// 		continue
// // 	// 	}

// // 	// 	selectedKeys = ArrayUtils.push(selectedKeys, key)
// // 	// 	result = ArrayUtils.push(result, arr[key])
// // 	// }
// // 	// return result


// // 	// let length = arr.length

// // 	// let selectedKeys = []
// // 	// let result = []

// // 	// // let index = 0
// // 	// let interval = getRandomInteger(0, length - 1)
// // 	// let offset = 0

// // 	// while (result.length < count) {
// // 	// 	// let key = getRandomInteger(0, length - 1)

// // 	// 	// if (selectedKeys.includes(key)) {
// // 	// 	// 	continue
// // 	// 	// }

// // 	// 	// selectedKeys = ArrayUtils.push(selectedKeys, key)

// // 	// 	result = ArrayUtils.push(result, arr[offset + interval])
// // 	// 	offset += interval
// // 	// 	if(offset>=length){
// // 	// 		offset = 
// // 	// 	}
// // 	// 	// offset += offset
// // 	// }

// // 	// return result

// // 	// Shuffle array
// // 	const shuffled = arr.sort(() => 0.5 - Math.random());

// // 	// Get sub-array of first n elements after shuffled
// // 	return shuffled.slice(0, count)
// // }
// export let randomSelectCount = (arr, count) => {
// 	if (arr.length <= count) {
// 		return arr.slice()
// 	}

// 	// Use Fisher-Yates algorithm for efficient random selection
// 	const result = arr.slice()
// 	for (let i = 0; i < count; i++) {
// 		const j = getRandomInteger(i, arr.length - 1)
// 			;[result[i], result[j]] = [result[j], result[i]]
// 	}
// 	return result.slice(0, count)
// }

// export let randomSelectMaxCountByRate = (arr, count, rateArr, minCount = 0) => {
// 	requireCheck(() => {
// 		test("rate should be valid", () => {
// 			return rateArr.filter(rate => between(rate, 0, 1)).length == rateArr.length
// 		})
// 	}, true)

// 	if (arr.length < count) {
// 		if (arr.length < minCount) {
// 			throw new Error("err")
// 		}

// 		return arr
// 	}

// 	// let totalWeight = rateArr.reduce((sum, rate) => sum + rate, 0)

// 	let result = rateArr.reduce((result, rate, i) => {
// 		// rate = rate / totalWeight

// 		if (isRandomRate(rate) && result.length < count) {
// 			return ArrayUtils.push(result, arr[i])
// 		}

// 		return result
// 	}, [])

// 	if (result.length < minCount) {
// 		return arr.slice(0, minCount)
// 	}

// 	return result
// }

// export let randomSelectMaxCountByWeight = (arr, count, weightArr: Array<number>, minCount = 0) => {
// 	if (arr.length < minCount) {
// 		throw new Error("Array length is less than minCount")
// 	}

// 	count = lessThan(count, weightArr.filter(weight => weight > 0).length)

// 	// Create weighted entries
// 	const weightedEntries = arr.map((item, index) => ({
// 		item,
// 		// weight: rateArr[index] || 1
// 		weight: weightArr[index]
// 	}))

// 	// Calculate total weight
// 	let totalWeight = weightedEntries.reduce((sum, entry) => sum + entry.weight, 0)

// 	const selected = []
// 	let remainingCount = count

// 	while (remainingCount > 0 && weightedEntries.length > 0) {
// 		// Select an item with probability proportional to its weight
// 		let randomValue = Math.random() * totalWeight
// 		let selectedIndex = 0

// 		for (let i = 0; i < weightedEntries.length; i++) {
// 			randomValue -= weightedEntries[i].weight
// 			if (randomValue <= 0) {
// 				selectedIndex = i
// 				break
// 			}
// 		}

// 		// Add selected item to results
// 		selected.push(weightedEntries[selectedIndex].item)

// 		// Update total weight by removing the selected item's weight
// 		totalWeight -= weightedEntries[selectedIndex].weight

// 		// Remove selected item from consideration
// 		weightedEntries.splice(selectedIndex, 1)

// 		remainingCount--
// 	}

// 	// If we didn't reach minCount, fill with random selections
// 	if (selected.length < minCount) {
// 		const additionalNeeded = minCount - selected.length
// 		const additionalItems = randomSelectCount(arr, additionalNeeded)
// 		selected.push(...additionalItems)
// 	}

// 	return selected.slice(0, count)
// }


// export let getDecimal = (value, digit) => {
// 	// return Math.floor(value * Math.pow(10, digit)) / Math.pow(10, digit)
// 	return Math.round(value * Math.pow(10, digit)) / Math.pow(10, digit)
// }

// export let isInteger = (value) => {
// 	return Math.floor(value) == value
// }

// export let isNumber = (value) => {
// 	return typeof value === 'number' && isFinite(value);
// }

// export let isNumberArray = (value) => {
// 	return Array.isArray(value) && value.filter(item => !isNumber(item)).length == 0

// }

// export let isNearlyEqual = (value1, value2, digit = 2) => {
// 	return Math.round(value1 * Math.pow(10, digit)) == Math.round(value2 * Math.pow(10, digit))
// }

// export let ceil = (value) => {
// 	if (value > 0) {
// 		return Math.ceil(value)
// 	}

// 	return Math.floor(value)
// }

// export let clamp = (value, min, max) => {
// 	if (value < min) {
// 		return min
// 	}

// 	if (value > max) {
// 		return max
// 	}

// 	return value
// }

// export let greaterThan = (value, min) => {
// 	return Math.max(value, min)
// }

// export let lessThan = (value, max) => {
// 	return Math.min(value, max)
// }


// // export let clampMin = (value, min) => {
// // 	if (value < min) {
// // 		return min
// // 	}

// // 	return value
// // }

// // export let clampMax = (value, max) => {
// // 	if (value > max) {
// // 		return max
// // 	}

// // 	return value
// // }


// export let getRandomValue1 = () => {
// 	return 2 * Math.random() - 1
// }

// export let toFloatString = (value: number) => {
// 	if (isInteger(value)) {
// 		return `${value}.0`
// 	}

// 	return String(value)
// }

// export let getRandomValue2 = (value: number) => {
// 	return Math.floor(Math.random() * value)
// }

// export let getRandomValue3 = (value: number, min: number) => {
// 	return Math.random() * value + min
// }


// export let isRandomRate = (rate: number) => {
// 	// requireCheck(() => {
// 	// 	test("rate should in [0,1]", () => {
// 	// 		return between(rate, 0, 1)
// 	// 	})
// 	// }, true)
// 	requireCheck(() => {
// 		test(`rate should be valid. rate: ${rate}`, () => {
// 			return !isNaN(rate)
// 		})
// 		test(`rate should >= 0. rate: ${rate}`, () => {
// 			return rate >= 0
// 		})
// 	}, true)

// 	return Math.random() < rate
// }



// export let randomHexColor = () => {
// 	//随机生成十六进制颜色 
// 	var hex = Math.floor(Math.random() * 16777216).toString(16);
// 	//生成ffffff以内16进制数 
// 	while (hex.length < 6) {
// 		//while循环判断hex位数，少于6位前面加0凑够6位
// 		hex = '0' + hex;
// 	}
// 	return '#' + hex;  //返回‘#'开头16进制颜色
// }

// export let getHalfValue = (value1, value2) => {
// 	return value2 + (value1 - value2) / 2
// }

// export let fixFloatError = (value, digit = 3) => {
// 	// return Number(value.toFixed(digit))
// 	return getDecimal(value, digit)
// }

export let convertDecimalToPercent = (value: number, digit = 3) => {
	if (digit < 2) {
		throw new Error("error")
	}

	return Math.round(value * Math.pow(10, digit)) / Math.pow(10, digit - 2)
}