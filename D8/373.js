var kSmallestPairs = function(nums1, nums2, k) {
    console.log("START", nums1, nums2, k);

    const res = [];
    if (!nums1.length || !nums2.length) return res;

    // priority queue = simple array
    let pq = [];

    // Start by pairing nums1[i] with nums2[0]
    for (let i = 0; i < Math.min(nums1.length, k); i++) {
        pq.push([nums1[i] + nums2[0], i, 0]);
        console.log(`PUSH: (${nums1[i]}, ${nums2[0]})`);
    }

    pq.sort((a, b) => a[0] - b[0]);

    while (k-- > 0 && pq.length > 0) {
        let [sum, i, j] = pq.shift();
        console.log(`POP: (${nums1[i]}, ${nums2[j]})`);

        res.push([nums1[i], nums2[j]]);

        // Push the next pair (i, j+1)
        if (j + 1 < nums2.length) {
            pq.push([nums1[i] + nums2[j + 1], i, j + 1]);
            console.log(`  NEXT: (${nums1[i]}, ${nums2[j+1]})`);
            pq.sort((a, b) => a[0] - b[0]);
        }
    }

    console.log("RESULT:", res);
    return res;
};
kSmallestPairs([1,7,11], [2,4,6], 3);
