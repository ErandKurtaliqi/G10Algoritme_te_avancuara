// --------------------------
// Build Binary Tree from Array
// --------------------------
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

function buildTree(arr) {
    if (!arr.length) return null;
    const nodes = arr.map(v => (v === null ? null : new TreeNode(v)));
    let i = 0;
    for (let j = 1; j < nodes.length; j += 2) {
        if (nodes[i] !== null) {
            nodes[i].left = nodes[j] || null;
            nodes[i].right = nodes[j + 1] || null;
        }
        i++;
        while (i < nodes.length && nodes[i] === null) i++;
    }
    return nodes[0];
}

// --------------------------
// Your Function
// --------------------------
var maxSumBST = function(root) {
    let maxSum = 0;

    function dfs(node) {
        if (!node) {
            return {
                isBST: true,
                min: Infinity,
                max: -Infinity,
                sum: 0
            };
        }

        const left = dfs(node.left);
        const right = dfs(node.right);

        if (!left.isBST || !right.isBST || left.max >= node.val || node.val >= right.min) {
            return { isBST: false };
        }

        const sum = left.sum + right.sum + node.val;
        maxSum = Math.max(maxSum, sum);

        return {
            isBST: true,
            min: Math.min(left.min, node.val),
            max: Math.max(right.max, node.val),
            sum
        };
    }

    dfs(root);
    return maxSum;
};

// --------------------------
// TEST CASES
// --------------------------

console.log("Test 1:");
let t1 = buildTree([1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]);
console.log(maxSumBST(t1));   // Expected: 20

console.log("Test 2:");
let t2 = buildTree([4,3,null,1,2]);
console.log(maxSumBST(t2));   // Expected: 2

console.log("Test 3:");
let t3 = buildTree([-4,-2,-5]);
console.log(maxSumBST(t3));   // Expected: 0
