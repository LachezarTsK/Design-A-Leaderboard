
var Leaderboard = function () {
    this.id_to_scores = new Map();
    this.scores = [];
    this.inputDataUnchanged = false;
};

/** 
 * @param {number} playerId 
 * @param {number} score
 */
Leaderboard.prototype.addScore = function (playerId, score) {
    if (!this.id_to_scores.has(playerId)) {
        this.id_to_scores.set(playerId, score);
    } else {
        this.id_to_scores.set(playerId, this.id_to_scores.get(playerId) + score);
    }
    this.inputDataUnchanged = false;
};

/** 
 * @param {number} K
 * @return {number}
 */
Leaderboard.prototype.top = function (K) {
    if (this.inputDataUnchanged === false) {
        this.scores = [];
        for (let score of this.id_to_scores.values()) {
            this.scores.push(score);
        }
    }

    this.quickSelect(0, this.id_to_scores.size - 1, K);

    let topK_scores = 0;
    for (let i = 0; i < K; i++) {
        topK_scores += this.scores[i];
    }

    this.inputDataUnchanged = true;
    return topK_scores;
};

/** 
 * @param {number} left
 * @param {number} right
 * @param {number} K
 */
Leaderboard.prototype.quickSelect = function (left, right, K) {

    let pivotIndex = left + Math.floor((right - left) / 2);
    pivotIndex = this.partition(left, right, pivotIndex);

    if (pivotIndex < K) {
        this.quickSelect(pivotIndex + 1, right, K);
    } else if (pivotIndex > K) {
        this.quickSelect(left, pivotIndex - 1, K);
    }
};

/** 
 * @param {number} left
 * @param {number} right
 * @param {number} pivotIndex
 * @return {number}
 */
Leaderboard.prototype.partition = function (left, right, pivotIndex) {

    let pivotValue = this.scores[pivotIndex];
    this.swap(right, pivotIndex);
    pivotIndex = left;

    for (let i = left; i < right; i++) {
        if (this.scores[i] >= pivotValue) {
            this.swap(i, pivotIndex);
            pivotIndex++;
        }
    }
    this.swap(right, pivotIndex);
    return pivotIndex;
};

/** 
 * @param {number} first
 * @param {number} second
 */
Leaderboard.prototype.swap = function (first, second) {
    let temp = this.scores[first];
    this.scores[first] = this.scores[second];
    this.scores[second] = temp;
};

/** 
 * @param {number} playerId
 */
Leaderboard.prototype.reset = function (playerId) {
    this.id_to_scores.delete(playerId);
    this.inputDataUnchanged = false;
};
