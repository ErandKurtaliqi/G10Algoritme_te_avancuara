var checkSubarraySum = function(nums, k) {
    const remainderMap = new Map();
    remainderMap.set(0, -1); 

    let prefixSum = 0;

    for (let i = 0; i < nums.length; i++) {
        prefixSum += nums[i];
        let remainder = prefixSum % k;

        if (remainder < 0) remainder += k;

        if (remainderMap.has(remainder)) {
            const prevIndex = remainderMap.get(remainder);
            if (i - prevIndex >= 2) {
                return true;
            }
        } else {
            remainderMap.set(remainder, i);
        }
    }

    return false;
};
console.log(checkSubarraySum([23, 2, 4, 6, 7], 6));   // true
console.log(checkSubarraySum([23, 2, 6, 4, 7], 6));   // true
console.log(checkSubarraySum([23, 2, 6, 4, 7], 13));  // false
